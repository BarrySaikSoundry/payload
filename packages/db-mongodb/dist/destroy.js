import mongoose from 'mongoose';
export const destroy = async function destroy() {
    if (this.mongoMemoryServer) {
        await this.mongoMemoryServer.stop();
    } else {
        await mongoose.disconnect();
    }
    Object.keys(mongoose.models).map((model)=>mongoose.deleteModel(model));
};

//# sourceMappingURL=destroy.js.map