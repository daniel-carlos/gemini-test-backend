interface Measure {
    id: string
    value: number
    imageUrl: string
    uuid: string
    date: Date
    measureType: MeasureType
}

enum MeasureType {
    Water,
    Gas
}

interface Customer {
    id: string
}