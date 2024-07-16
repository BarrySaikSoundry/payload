function createDependencyGraph(featureProviders) {
    const graph = {};
    for (const fp of featureProviders){
        graph[fp.key] = {
            dependencies: fp.dependencies || [],
            dependenciesPriority: fp.dependenciesPriority || [],
            dependenciesSoft: fp.dependenciesSoft || [],
            featureProvider: fp
        };
    }
    return graph;
}
function topologicallySortFeatures(featureProviders) {
    const graph = createDependencyGraph(featureProviders);
    const visited = {};
    const stack = [];
    for(const key in graph){
        if (!visited[key]) {
            visit(graph, key, visited, stack);
        }
    }
    return stack.reverse();
}
function visit(graph, key, visited, stack, currentPath = []) {
    if (!graph[key]) {
        throw new Error(`Feature key ${key} is not present in the dependency graph.`);
    }
    if (currentPath.includes(key)) {
        throw new Error(`Circular dependency detected: ${currentPath.join(' -> ')} -> ${key}`);
    }
    if (visited[key]) {
        return;
    }
    visited[key] = true;
    currentPath.push(key);
    // First process the hard priority dependencies
    for (const dep of graph[key].dependenciesPriority){
        if (!visited[dep]) {
            visit(graph, dep, visited, stack, currentPath);
        }
    }
    // Then process the normal dependencies, but make sure to not violate hard dependencies
    for (const dep of graph[key].dependencies){
        if (!visited[dep] && !graph[key].dependenciesPriority.includes(dep)) {
            visit(graph, dep, visited, stack, currentPath);
        }
    }
    // Then process the soft dependencies. Make sure to not violate hard and normal dependencies.
    for (const dep of graph[key].dependenciesSoft){
        if (graph[dep] && !visited[dep] && !graph[key].dependenciesPriority.includes(dep) && !graph[key].dependencies.includes(dep)) {
            visit(graph, dep, visited, stack, currentPath);
        }
    }
    stack.push(graph[key].featureProvider);
    currentPath.pop();
}
export function sortFeaturesForOptimalLoading(featureProviders) {
    return topologicallySortFeatures(featureProviders);
}
export async function loadFeatures({ config, isRoot, unSanitizedEditorConfig }) {
    // First remove all duplicate features. The LAST feature with a given key wins.
    unSanitizedEditorConfig.features = unSanitizedEditorConfig.features.reverse().filter((f, i, arr)=>{
        const firstIndex = arr.findIndex((f2)=>f2.key === f.key);
        return firstIndex === i;
    }).reverse();
    unSanitizedEditorConfig.features = sortFeaturesForOptimalLoading(unSanitizedEditorConfig.features);
    const featureProviderMap = new Map(unSanitizedEditorConfig.features.map((f)=>[
            f.key,
            f
        ]));
    const resolvedFeatures = new Map();
    // Make sure all dependencies declared in the respective features exist
    let loaded = 0;
    for (const featureProvider of unSanitizedEditorConfig.features){
        if (!featureProvider.key) {
            throw new Error(`A Feature you've added does not have a key. Please add a key to the feature. This is used to uniquely identify the feature.`);
        }
        if (featureProvider.dependencies?.length) {
            for (const dependencyKey of featureProvider.dependencies){
                const found = unSanitizedEditorConfig.features.find((f)=>f.key === dependencyKey);
                if (!found) {
                    throw new Error(`Feature ${featureProvider.key} has a dependency ${dependencyKey} which does not exist.`);
                }
            }
        }
        if (featureProvider.dependenciesPriority?.length) {
            for (const priorityDependencyKey of featureProvider.dependenciesPriority){
                // look in the resolved features instead of the editorConfig.features, as a dependency requires the feature to be loaded before it, contrary to a soft-dependency
                const found = resolvedFeatures.get(priorityDependencyKey);
                if (!found) {
                    const existsInEditorConfig = unSanitizedEditorConfig.features.find((f)=>f.key === priorityDependencyKey);
                    if (!existsInEditorConfig) {
                        throw new Error(`Feature ${featureProvider.key} has a priority dependency ${priorityDependencyKey} which does not exist.`);
                    } else {
                        throw new Error(`Feature ${featureProvider.key} has a priority dependency ${priorityDependencyKey} which is not loaded before it.`);
                    }
                }
            }
        }
        const feature = typeof featureProvider.feature === 'function' ? await featureProvider.feature({
            config,
            featureProviderMap,
            isRoot,
            resolvedFeatures,
            unSanitizedEditorConfig
        }) : featureProvider.feature;
        resolvedFeatures.set(featureProvider.key, {
            ...feature,
            dependencies: featureProvider.dependencies,
            dependenciesPriority: featureProvider.dependenciesPriority,
            dependenciesSoft: featureProvider.dependenciesSoft,
            key: featureProvider.key,
            order: loaded
        });
        loaded++;
    }
    return resolvedFeatures;
}

//# sourceMappingURL=loader.js.map