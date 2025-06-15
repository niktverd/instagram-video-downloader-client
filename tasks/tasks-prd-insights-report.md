# Tasks for Instagram Insights Report Page

## Relevant Files

- `src/pages/Insights/Root.tsx` - Main insights report page component with layout and basic structure
- `src/pages/Insights/index.ts` - Re-export file for Insights components
- `src/pages/Insights/types.ts` - TypeScript interfaces for component props and data structures
- `src/pages/Navigation/Main.tsx` - Main navigation with added Insights route configuration
- `src/pages/Insights/Root.test.tsx` - Unit tests for Root component
- `src/pages/Insights/components/PeriodFilters.tsx` - Year and month radio button selectors with Gravity UI
- `src/pages/Insights/components/PeriodFilters.test.tsx` - Unit tests for PeriodFilters component
- `src/pages/Insights/components/DayTabs.tsx` - Tabs component for day navigation with formatting
- `src/pages/Insights/components/DayTabs.test.tsx` - Unit tests for day tabs (14 tests passed)
- `src/pages/Insights/components/MetricTabs.tsx` - Tabs component for metric navigation
- `src/pages/Insights/components/MetricTabs.test.tsx` - Unit tests for metric tabs (16 tests passed)
- `src/pages/Insights/components/InsightsChart.tsx` - Recharts bar chart component
- `src/pages/Insights/components/InsightsChart.test.tsx` - Unit tests for chart component
- `src/pages/Insights/components/AccountFilters.tsx` - Account checkboxes and search functionality
- `src/pages/Insights/components/AccountFilters.test.tsx` - Unit tests for account filters
- `src/pages/Insights/hooks/useInsightsData.ts` - Custom hook for API data fetching
- `src/pages/Insights/hooks/useInsightsData.test.ts` - Unit tests for data hook
- `src/pages/Insights/hooks/useUrlParams.ts` - Custom hook for URL parameter management with day/metric support
- `src/pages/Insights/hooks/useUrlParams.test.tsx` - Unit tests for useUrlParams hook
- `src/pages/Insights/utils/dataTransformers.ts` - Utility functions for data transformation
- `src/pages/Insights/utils/dataTransformers.test.ts` - Unit tests for data transformers (25 tests passed)

### Notes

- Unit tests should be placed alongside the code files they are testing
- Use `npx jest [optional/path/to/test/file]` to run tests
- Follow the Structure_new.md pattern for page organization
- All components should use Gravity UI components for consistency

## Tasks

- [x] 1.0 Set up page structure and routing following Structure_new.md pattern

  - [x] 1.1 Create `src/pages/Insights/` directory structure
  - [x] 1.2 Create `Root.tsx` component with basic layout and routing setup
  - [x] 1.3 Create `index.ts` file for component re-exports
  - [x] 1.4 Add routing configuration for `/insights` path in main router
  - [x] 1.5 Create basic TypeScript interfaces for component props
  - [x] 1.6 Set up basic Gravity UI layout components (Container, Card, etc.)

- [x] 2.0 Implement period filters (year/month) with URL parameter integration

  - [x] 2.1 Create `PeriodFilters.tsx` component with Gravity UI RadioGroup
  - [x] 2.2 Implement year selector (2025 to current year) with radio buttons
  - [x] 2.3 Implement month selector (1-12) with radio buttons
  - [x] 2.4 Create `useUrlParams.ts` hook for reading/writing URL parameters
  - [x] 2.5 Integrate year/month state with URL query parameters (?year=2025&month=06)
  - [x] 2.6 Handle default values when no URL parameters are present
  - [x] 2.7 Add validation for year/month parameter values
  - [x] 2.8 Write unit tests for PeriodFilters component
  - [x] 2.9 Write unit tests for useUrlParams hook

- [x] 3.0 Create tabbed navigation system for days and metrics

  - [x] 3.1 Create `DayTabs.tsx` component using Gravity UI Tabs
  - [x] 3.2 Parse available days from API response data
  - [x] 3.3 Implement day selection with URL parameter integration (?day=2025-06-14)
  - [x] 3.4 Create `MetricTabs.tsx` component for metric navigation
  - [x] 3.5 Implement metric tabs (reach, follower_count, online_followers)
  - [x] 3.6 Integrate metric selection with URL parameters (?metric=reach)
  - [x] 3.7 Handle tab state synchronization between components
  - [x] 3.8 Add loading states for tabs during data fetching
  - [x] 3.9 Write unit tests for DayTabs component
  - [x] 3.10 Write unit tests for MetricTabs component

- [x] 4.0 Build interactive bar chart with recharts

  - [x] 4.1 Install and configure recharts library
  - [x] 4.2 Create `InsightsChart.tsx` component with BarChart setup
  - [x] 4.3 Create `dataTransformers.ts` utility for converting API data to chart format
  - [x] 4.4 Implement responsive chart sizing and layout
  - [x] 4.5 Configure single color scheme for all chart bars
  - [x] 4.6 Add proper axis labels and formatting
  - [x] 4.7 Handle empty data states with appropriate messaging
  - [x] 4.8 Implement chart re-rendering when data changes
  - [x] 4.9 Add loading state for chart component
  - [x] 4.10 Write unit tests for InsightsChart component
  - [x] 4.11 Write unit tests for dataTransformers utility

- [x] 5.0 Develop account filtering system with search functionality

  - [x] 5.1 Create `AccountFilters.tsx` component with search input
  - [x] 5.2 Implement search input using Gravity UI TextInput with debounce (300ms)
  - [x] 5.3 Create account checkboxes list using Gravity UI Checkbox
  - [x] 5.4 Implement case-insensitive partial search filtering
  - [x] 5.6 Set "total" account as selected by default
  - [x] 5.7 Handle account list updates when chart data changes
  - [x] 5.9 Implement real-time filtering of checkbox list based on search
  - [x] 5.10 Write unit tests for AccountFilters component
  - [x] 5.11 Write unit tests for search and filtering logic

- [x] 6.0 Integrate API data fetching and state management
  - [x] 6.1 Create `useInsightsData.ts` hook with React Query integration
  - [x] 6.2 Implement API call to `/ui/get-insights-report` endpoint
  - [x] 6.3 Add proper TypeScript typing using UiGetInsightsInstagramReportResponse
  - [ ] 6.4 Implement data validation using UiGetInsightsInstagramReportResponseSchema
  - [x] 6.5 Handle loading states with "Loading..." message
  - [x] 6.6 Handle error states with Gravity UI Alert component
  - [x] 6.7 Handle empty data states with appropriate placeholder
  - [x] 6.8 Implement automatic data refetching when year/month changes
  - [x] 6.9 Add data caching strategy with React Query
  - [x] 6.10 Integrate all components with shared data state
  - [x] 6.11 Write unit tests for useInsightsData hook
  - [ ] 6.12 Write integration tests for complete data flow
