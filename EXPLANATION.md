# Form Builder - Architecture & Technical Decisions

## 1. How you managed dynamic form state
The dynamic form state is managed centrally using React's `useState` hook at the top level of the application (`App.jsx`). 

We maintain a single source of truth called `schema`, which is an array of objects. Each object represents an individual form field and contains its metadata (e.g., `id`, `type`, `label`, `placeholder`, `required`, and `options` for multi-choice fields). 

- **Data Flow**: The `schema` state and its updater function (`setSchema`) are passed down as props to the `FormBuilder` component so users can mutate the form structure. Simultaneously, the read-only `schema` is passed down to the `LivePreview` component, ensuring the preview instantly reacts to any structural changes.
- **Persistence**: A `useEffect` hook intercepts initial loads to retrieve the schema from `localStorage`, and a manual "Save" function persists the current `schema` back to `localStorage`, allowing state to survive page refreshes.

## 2. How you handled reordering
Reordering is currently handled using a strict immutable array-swapping approach through upward and downward directional buttons. 

In `FormBuilder.jsx`, the `moveField` function accepts the `index` of the current field and a `direction` integer (`-1` for moving up, `1` for moving down).
1. We create a shallow copy of the current schema (`[...schema]`).
2. We calculate the `target` index (`index + direction`).
3. If the target is within the array bounds, we use JavaScript array destructuring to swap the elements: `[newSchema[index], newSchema[target]] = [newSchema[target], newSchema[index]]`.
4. The state is then updated with the newly ordered array.

## 3. Challenges faced and solutions
- **Challenge: UI State Synchronization & Prop Drilling**
  As the layout grew, keeping `App.jsx` clean became difficult. 
  *Solution*: Refactored the UI into separate, modular components (`FormBuilder.jsx` and `LivePreview.jsx`). This isolated the rendering logic, keeping `App.jsx` strictly as the state orchestrator.
- **Challenge: Complex Nested State Updates**
  Updating a deeply nested property—like changing the text of an option inside a dropdown field—violates React's immutability rules if done incorrectly. 
  *Solution*: Utilized `Array.prototype.map` to iterate over the schema and reconstruct objects. When the targeted `field.id` matches, we explicitly clone the `options` array, replace the targeted index, and return a fresh object without mutating the original state.
- **Challenge: Consistent Layout Geometry**
  Ensuring inputs didn't stretch awkwardly across wide screens while remaining responsive.
  *Solution*: Enforced centralized, standardized Tailwind width classes (e.g., `w-1/2`) combined with flexbox layouts to ensure identical rendering logic between the Builder panel and Preview panel.

## 4. How you would scale this for 100+ fields
If the application needed to support 100+ fields concurrently, the current architecture would experience performance bottlenecks due to excessive DOM nodes and widespread re-renders. To scale it, I would implement:

1. **List Virtualization**: Implement a library like `react-window` or `react-virtuoso` in both the Form Builder and Live Preview. This ensures only the fields currently visible within the user's viewport are rendered to the DOM, drastically cutting memory usage and rendering time.
2. **Component Memoization**: Wrap the individual field rendering components in `React.memo()` with custom comparison functions. This would guarantee that editing Field #99 does not inadvertently trigger a re-render of Fields #1 through #98.
3. **Advanced State Management**: Migrate away from lifting state via `useState` and adopt a global, atomic state manager like `Zustand` or `Recoil`, or use standard `useReducer`. This would prevent the entire `FormBuilder` from re-rendering just because one nested input changed.
4. **Drag & Drop**: Swap the manual Up/Down chevron buttons for a highly optimized drag-and-drop library like `@hello-pangea/dnd` or `dnd-kit`, which handles hardware-accelerated transitions for large lists seamlessly.
5. **Debounced Inputs**: Wrap text inputs (labels, placeholders, options) in debounced change handlers to limit how frequently the global state receives updates during rapid typing.
