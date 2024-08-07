import { ICategory } from "../category/icategory"

export interface IItems {
    id?: number
    codItem: string
    name: string
    category: string
    model: string
    branding: string
    description: string
    buyPrice: number
    sellPrice: number
    sku?: string
    unitMeasureEnum: string
    unitMeasureQtd: number
    statusEnum: string
    qtd: number
}
