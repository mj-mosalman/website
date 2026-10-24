import { concerns, treatmentCategories } from '../../content/treatments'

export type TreatmentFilterValue = {
  q: string
  category: string
  concern: string
}

type TreatmentFiltersProps = {
  value: TreatmentFilterValue
  onChange: (next: TreatmentFilterValue, options?: { replace?: boolean }) => void
  onReset: () => void
  resultCount: number
  totalCount: number
}

export function TreatmentFilters({
  value,
  onChange,
  onReset,
  resultCount,
  totalCount,
}: TreatmentFiltersProps) {
  const isFiltered = Boolean(value.q || value.category || value.concern)

  return (
    <div className="filters">
      <div className="filters__search">
        <label htmlFor="treatment-search" className="filters__label">
          Search treatments
        </label>
        <input
          id="treatment-search"
          type="search"
          value={value.q}
          placeholder="Try “peel”, “laser”, “consultation”"
          autoComplete="off"
          onChange={(event) => onChange({ ...value, q: event.target.value }, { replace: true })}
        />
      </div>

      <div className="filters__field">
        <label htmlFor="filter-category" className="filters__label">
          Category
        </label>
        <select
          id="filter-category"
          value={value.category}
          onChange={(event) => onChange({ ...value, category: event.target.value })}
        >
          <option value="">All categories</option>
          {treatmentCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="filters__field">
        <label htmlFor="filter-concern" className="filters__label">
          Area of interest
        </label>
        <select
          id="filter-concern"
          value={value.concern}
          onChange={(event) => onChange({ ...value, concern: event.target.value })}
        >
          <option value="">All areas</option>
          {concerns.map((concern) => (
            <option key={concern.id} value={concern.id}>
              {concern.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filters__status">
        <p role="status" aria-live="polite" className="filters__count">
          {resultCount} of {totalCount} treatments
        </p>
        {isFiltered ? (
          <button type="button" className="filters__reset" onClick={onReset}>
            Reset filters
          </button>
        ) : null}
      </div>
    </div>
  )
}
