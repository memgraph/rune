export interface Node {
    data: {
        id: string;
        label: string;
        priority: number;
    };
}

export interface Edge {
    data: {
        id: string;
        source: string;
        target: string;
    };
}