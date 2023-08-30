// TODO: add more data (mock/backend/fetch)
export const nodes = [
    { data: { id: "n1", label: "julia-fer", priority: 3 } },
    { data: { id: "n2", label: "dz", priority: 2 } },
    { data: { id: "n3", label: "dz1.jl", priority: 1 } },
    { data: { id: "n4", label: "dz2.jl", priority: 1 } },
    { data: { id: "n5", label: "dz3.jl", priority: 1 } },
    { data: { id: "n6", label: "dz4.jl", priority: 1 } },
    { data: { id: "n7", label: "dz5.jl", priority: 1 } },
    { data: { id: "n8", label: "projekt.jl", priority: 1 } },
    { data: { id: "n10", label: "dz4.md", priority: 1 } },
    { data: { id: "n11", label: "dz5.md", priority: 1 } },
    { data: { id: "n12", label: "projekt.md", priority: 1 } },
    { data: { id: "n9", label: "docs", priority: 2 } },
];

export const edges = [
    { data: { id: "e1", source: "n1", target: "n2" } },
    { data: { id: "e2", source: "n1", target: "n8" } },
    { data: { id: "e3", source: "n2", target: "n3" } },
    { data: { id: "e4", source: "n2", target: "n4" } },
    { data: { id: "e5", source: "n2", target: "n5" } },
    { data: { id: "e6", source: "n2", target: "n6" } },
    { data: { id: "e7", source: "n2", target: "n7" } },
    { data: { id: "e8", source: "n1", target: "n9" } },
    { data: { id: "e9", source: "n9", target: "n10" } },
    { data: { id: "e10", source: "n9", target: "n11" } },
    { data: { id: "e11", source: "n9", target: "n12" } },
];