import type { Category } from '../types'

interface CategoryFilterProps {
    categories: Category[]
    selectedCategoryId: number | null
    onSelect: (id: number | null) => void
}

function CategoryFilter({ categories, selectedCategoryId, onSelect }: CategoryFilterProps) {
    return (
        <div style={{ marginBottom: 20 }}>
            <strong>Kateqoriyalar: </strong>
            <button onClick={() => onSelect(null)} style={{ marginRight: 5 }}>
                Hamısı
            </button>
            {categories.map((cat) => (
                <button key={cat.id} onClick={() => onSelect(cat.id)} style={{ marginRight: 5 }}>
                    {cat.name}
                </button>
            ))}
        </div>
    )
}

export default CategoryFilter