import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPagination } from 'src/types/models/IPagination';
import { IProduct } from 'src/types/models/IProduct';
import { IProductLine } from 'src/types/models/IProductline';
import { IProductService } from 'src/types/services/IProductService';
import { ILike, Repository } from 'typeorm';
import { Product } from './products.entity';

@Injectable()
export class ProductsService implements IProductService {
    constructor(@InjectRepository(Product) private repo: Repository<Product>) { }


    async getListProductLine(
        page: number,
        pageSize: number,
        search: string,
        categoryId: number,): Promise<IPagination<IProductLine>> {
        const result = await this.repo.manager.query(`
        WITH ProductLine AS (
            SELECT DISTINCT ON (p."series")
                p."series" AS series,
                ARRAY_AGG(DISTINCT p."color") AS colors
            FROM product p
            WHERE p."categoryId" = ${categoryId}
            AND p.name ILIKE '%${search}%'
            GROUP BY p."series"
            ORDER BY p."series"
            LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}
        )
        SELECT pl.series, pl.colors, json_agg(p.*) AS products
        FROM ProductLine pl
        JOIN public.product p ON p."series" = pl.series AND p."categoryId" = ${categoryId}
        GROUP BY pl.series, pl.colors;
    `)

        const pagination: IPagination<IProductLine> = {
            totalPages: Math.ceil(result.length / pageSize),
            page,
            totalItems: result.length,
            pageSize,
            items: result,
        };

        return pagination;
    }

    async getById(id: number) {
        if (!id) {
            return null
        }
        return this.repo.findOne({
            where: {
                id: id
            }
        });
    }

}
