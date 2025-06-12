import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

export async function GET(request) {
    try {
        const searchIndexPath = path.resolve(process.cwd(), 'src/data/search-index.json');

        if (!fs.existsSync(searchIndexPath)) {
            return NextResponse.json(
                { error: 'Search index not found. Please run the build script.' },
                { status: 404 }
            );
        }

        const searchData = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));

        // Get query parameters for filtering
        const { searchParams } = new URL(request.url);

        const packageName = searchParams.get('packageName');
        const version = searchParams.get('version');

        // Filter search data based on package and version if provided
        let filteredData = searchData;

        if (packageName || version) {
            filteredData = searchData.filter((item) => {
                if (packageName && item.packageName !== packageName) {
                    return false;
                }

                if (version && item.version !== version) {
                    return false;
                }

                return true;
            });
        }

        return NextResponse.json(filteredData, {
            headers: {
                'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
            },
        });
    } catch (error) {
        console.error('Failed to serve search data:', error);

        return NextResponse.json(
            { error: 'Failed to load search data' },
            { status: 500 }
        );
    }
}
