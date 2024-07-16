import formatName from './formatName.js';
const combineParentName = (parent, name)=>formatName(`${parent ? `${parent}_` : ''}${name}`);
export default combineParentName;

//# sourceMappingURL=combineParentName.js.map