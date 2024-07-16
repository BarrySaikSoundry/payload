import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import * as AWS from '@aws-sdk/client-s3';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { authAsCognitoUser } from './authAsCognitoUser.js';
let storageClient = null;
let session = null;
let identityID;
export const getStorageClient = async ()=>{
    if (storageClient && session?.isValid()) {
        return {
            identityID,
            storageClient
        };
    }
    session = await authAsCognitoUser(process.env.PAYLOAD_CLOUD_PROJECT_ID, process.env.PAYLOAD_CLOUD_COGNITO_PASSWORD);
    const cognitoIdentity = new CognitoIdentityClient({
        credentials: fromCognitoIdentityPool({
            clientConfig: {
                region: 'us-east-1'
            },
            identityPoolId: process.env.PAYLOAD_CLOUD_COGNITO_IDENTITY_POOL_ID,
            logins: {
                [`cognito-idp.us-east-1.amazonaws.com/${process.env.PAYLOAD_CLOUD_COGNITO_USER_POOL_ID}`]: session.getIdToken().getJwtToken()
            }
        })
    });
    const credentials = await cognitoIdentity.config.credentials();
    // @ts-expect-error
    identityID = credentials.identityId;
    storageClient = new AWS.S3({
        credentials,
        region: process.env.PAYLOAD_CLOUD_BUCKET_REGION
    });
    return {
        identityID,
        storageClient
    };
};

//# sourceMappingURL=getStorageClient.js.map