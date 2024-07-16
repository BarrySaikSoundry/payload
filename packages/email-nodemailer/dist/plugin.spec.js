import { jest } from '@jest/globals';
import nodemailer from 'nodemailer';
import { nodemailerAdapter } from './index.js';
const defaultArgs = {
    defaultFromAddress: 'test@test.com',
    defaultFromName: 'Test'
};
describe('email-nodemailer', ()=>{
    describe('transport verification', ()=>{
        let mockedVerify;
        let mockTransport;
        beforeEach(()=>{
            mockedVerify = jest.fn();
            mockTransport = nodemailer.createTransport({
                name: 'existing-transport',
                // eslint-disable-next-line @typescript-eslint/require-await
                send: async (mail)=>{
                    console.log('mock send', mail);
                },
                version: '0.0.1',
                verify: mockedVerify
            });
        });
        it('should be invoked when skipVerify = false', async ()=>{
            await nodemailerAdapter({
                ...defaultArgs,
                transport: mockTransport,
                skipVerify: false
            });
            expect(mockedVerify.mock.calls).toHaveLength(1);
        });
        it('should be invoked when skipVerify is undefined', async ()=>{
            await nodemailerAdapter({
                ...defaultArgs,
                transport: mockTransport,
                skipVerify: false
            });
            expect(mockedVerify.mock.calls).toHaveLength(1);
        });
        it('should not be invoked when skipVerify = true', async ()=>{
            await nodemailerAdapter({
                ...defaultArgs,
                transport: mockTransport,
                skipVerify: true
            });
            expect(mockedVerify.mock.calls).toHaveLength(0);
        });
    });
});

//# sourceMappingURL=plugin.spec.js.map