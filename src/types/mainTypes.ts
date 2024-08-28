interface Measure {
    id: string
    value: number
    imageUrl: string
    uuid: string
    date: Date
    measureType: MeasureType
}

export enum MeasureType {
    Water,
    Gas
}

interface Customer {
    id: string
}