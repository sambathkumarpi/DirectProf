import { NextApiRequest, NextApiResponse } from "next"
import prisma from '@/app/libs/prismadb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    if(req.method === 'GET') {
        try {
            const { q: query } = req.query;

            if(typeof query !== 'string') {
                throw new Error('Query must be a string');
            }

            const courses = await prisma.course.findMany({
                where: {
                    OR: [
                        {
                            title: {
                                contains: query,
                                mode: 'insensitive'
                            }
                        },
                        {
                            description: {
                                contains: query,
                                mode: 'insensitive'
                            }
                        }
                    ]
                }
            });

            res.status(200).json({ courses });

        } catch(err) {
            console.log(err);
            throw err;
        }
    }
    }