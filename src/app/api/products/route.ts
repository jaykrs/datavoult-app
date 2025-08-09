import { NextResponse } from 'next/server';
import { parseAuthCookie, verifyJwt, verifyRole } from '../utils/jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    if(searchParams.get('productid') && !searchParams.get('tag')) {
    const numValue: number = Number(searchParams.get('productid'));
    const product = await prisma.product.findUnique({
        where: {
            id: numValue
        }
    })
    if (!product) {
        return NextResponse.json({ error: 'product  does not exist' }, { status: 404 });
    }
    return NextResponse.json({ message: 'product details', product });
} else if(searchParams.get('tag') && !searchParams.get('productid')) {
    const tag = searchParams.get('tag');
    if (!tag) {
        return NextResponse.json({ error: 'Tag parameter is missing' }, { status: 400 });
    }
    const products = await prisma.product.findMany({
        where: {
            tag: {
                contains: tag,
            }
        }
    });
    if (!products || products.length === 0) {
        return NextResponse.json({ error: 'No products found with that tag' }, { status: 404 });
    }
    return NextResponse.json({ message: 'product details', products });
} else if(searchParams.get('products') && searchParams.get('products') === "all") {
    const products = await prisma.product.findMany({});
    return NextResponse.json({ message: 'product list', products });
}
    // Return a default response or error if no conditions are met
    return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 });
}

export async function POST(request: Request) {
    const requestBody = await request.json();
    const token = parseAuthCookie(request.headers.get('cookie'));
    const payload = token ? verifyJwt(token) : null;

    if (!payload || (await verifyRole(payload.userId)) !== "admin") {
        return NextResponse.json({ error: 'Unauthorized: Admin role required' }, { status: 403 });
    }
    const newProduct = await prisma.product.create({
        data: requestBody,
    });
    return NextResponse.json({ message: 'product added', newProduct }, { status: 200 });
}

export async function PUT(request: Request) {
    const { searchParams } = new URL(request.url);
    const numValue: number = Number(searchParams.get('productid'));
    const requestBody = await request.json();
    const token = parseAuthCookie(request.headers.get('cookie'));
    const payload = token ? verifyJwt(token) : null;

    if (!payload || (await verifyRole(payload.userId)) !== "admin") {
        return NextResponse.json({ error: 'Unauthorized: Admin role required' }, { status: 403 });
    }
    const product = await prisma.product.findUnique({
        where: {
            id: numValue
        }
    })
    if (!product) {
        return NextResponse.json({ error: 'Product does not exist' }, { status: 404 });
    }
    const newProduct = await prisma.product.update({
        data: requestBody,
        where: {
            id: numValue
        }
    });
    return NextResponse.json({ message: 'product updated', newProduct }, { status: 200 });
}