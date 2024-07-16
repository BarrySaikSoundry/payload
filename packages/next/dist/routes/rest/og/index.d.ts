import type { PayloadRequest } from 'payload';
import { ImageResponse } from 'next/og.js';
import { NextResponse } from 'next/server.js';
export declare const runtime = "nodejs";
export declare const contentType = "image/png";
export declare const generateOGImage: ({ req }: {
    req: PayloadRequest;
}) => Promise<NextResponse<{
    error: string;
}> | ImageResponse>;
//# sourceMappingURL=index.d.ts.map