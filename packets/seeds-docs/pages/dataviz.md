---
title: Data Visualization
layout: default
---

Having a standardized language for how we handle data provides a consistent story for our users. This consistent story helps users identify trends and answer questions about their data.

When creating graphs, charts or other types of data visualization, we have specific rules to ensure that all charts appear on brand and consistent.

## Number Formatting

All numbers follow the user setting for number format first, and then the user’s locale default second.

Totals should be semibold and `Neutral 900` to stand out.

Use `Teal 500` for positive trending percentages, and `Neutral 900` for negative trending percentages (call attention to positive values only).

### Usage

- **General**
	- Always use at least 2 significant digits
	- If rounded, do not show trailing `0`s
	- Use commas to separate every three digits
	- If truncated, use a tooltip to show the full value
	- Use the following abbreviations:
		- `k` (thousand)
		- `M` (million)
		- `b` (billion)
- **Zero and Null/Undefined**
	- In App
		- Zeros should be displayed as `0`
		- Nulls and Undefined should be displayed as `-`
	- CSV Exports
		- Zeros should be displayed as `0`
		- Nulls and Undefined should be displayed as a blank cell
- **Currency**
	- Round to 2 decimal places or 2 significant digits
	- Truncate if value is `>= 1,000`
- **Decimal**
	- Round to 2 decimal places or 2 significant digits
	- Truncate if value is `>= 1,000`
- **Integer**
	- Optionally abbreviate if value is `>= 10,000`
- **Percent**
	- Round to 2 decimal places or 2 significant digits
	- Truncate if value is `>= 1,000%`
- **Ordinal**
	- Round to 2 decimal places or 2 significant digits
- **Data Exports (CSV)**
	- For metrics provided directly by the network, use the same precision as the network (no rounding).
	- For all other metrics, round following the precision guidelines.

## Chart Formatting

Charts are a visual way to display user data in a way to show trends and how their social activity impacts their business. When creating charts, try not to plot more than 4 items per chart.

### Chart Types

- Line
	- Line weight: `3px`
- Bar
- Area
- Stacked Area
- Multi Select
	- Line chart with an interactive key
	- Maximum of 20 items
- Donut
	- `1px` white line separations between segments
- Horizontal Bar

### Chart Colors

<details>
	<summary>**Comparable Data**</summary>

	When creating charts with comparable data, use analogous color schemes to create a relationship between the items. Colors should be applied in the following order:

	<ul>
		<li>`Teal 500` </li>
		<li>`Teal 800`</li>
		<li>`Purple 500`</li>
		<li>`Purple 800`</li>
	</ul>
</details>

<details>
	<summary>**Contrasting Data**</summary>

	When creating charts with contrasting data, use complementary color schemes to ensure that the data can easily be differentiated. Colors should be applied in the following order:

	<ul>
		<li>`Teal 500` </li>
		<li>`Purple 800`</li>
		<li>`Magenta 500`</li>
		<li>`Yellow 800`</li>
		<li>`Blue 500`</li>
		<li>`Pink 800`</li>
	</ul>
</details>

<details>
	<summary>**Color Rotation**</summary>

	For reports that have an interactive key or up to 20 data points, cycle through the following colors:

	<ul>
		<li>`Green 500` </li>
		<li>`Teal 500`</li>
		<li>`Blue 500`</li>
		<li>`Purple 500`</li>
		<li>`Magenta 500`</li>
		<li>`Pink 500`</li>
		<li>`Red 500`</li>
		<li>`Orange 500`</li>
		<li>`Yellow 500`</li>
		<li>`Neutral 500`</li>
		<li>`Green 800`</li>
		<li>`Teal 800`</li>
		<li>`Blue 800`</li>
		<li>`Purple 800`</li>
		<li>`Magenta 800`</li>
		<li>`Pink 800`</li>
		<li>`Red 800`</li>
		<li>`Orange 800`</li>
		<li>`Yellow 800`</li>
		<li>`Neutral 700`</li>
	</ul>
</details>

#### Network colors

Networks colors should not be used in data visualization.

### Do’s and Don’ts

<details>
	<summary>Show</summary>

	<ul>
		<li class='do'>**DO:** Show the axis lines where the data will be represented ![DO: Axis Lines]({{{siteUrl}}}/assets/axislinesdo.svg)</li>

		<li class='do'>**DO:** Extend the axis lines to fill the full width of the content area ![DON'T: Axis Lines]({{{siteUrl}}}/assets/axislinesdont.svg)</li>

		<li class='dont'>**DON'T:** Use standard abbreviations for labels ![DO: Abbreviations]({{{siteUrl}}}/assets/abbreviationdo.svg)</li>

		<li class='do'>**DO:** Slant labels to make them fit ![DON'T: Abbreviations]({{{siteUrl}}}/assets/abbreviationdont.svg)</li>

		<li class='dont'>**DON'T:** Center the chart Key below the chart ![DO: Key]({{{siteUrl}}}/assets/keydo.svg)</li>

		<li class='do'>**DO:** Left or Right Align the chart Key, or place it above the chart ![DON'T: Key]({{{siteUrl}}}/assets/keydont.svg)</li>

		<li class='do'>**DO:** Round off points ![DO: Points]({{{siteUrl}}}/assets/pointsdo.svg)</li>

		<li class='do'>**DO:** Have charts have any sharp points ![DON'T: Points]({{{siteUrl}}}/assets/pointsdont.svg)</li>
	</ul>
</details>

## Table Formatting

A table is a good way to showcase a large amount of information which has a variety of columns and data to show for each entity. A table should be used when multiple metrics and categories need to be presented together, and accurate lookup of the data values is more important that showing patterns in the data.

### Do's and Don'ts

<details>
	<summary>Show</summary>

	<ul>
		<li class='do'>**DO:** Left align non-numeric values and right align numeric values ![DO: Data]({{{siteUrl}}}/assets/datado.svg)</li>
		<li class='do'>**DO:** Left align non-numeric values and right align numeric values ![DO: Data]({{{siteUrl}}}/assets/datado.svg)</li>
		<li class='dont'>**DON’T:** Center column headers and data ![DON'T: Data]({{{siteUrl}}}/assets/datadont.svg)</li>
		<li class='do'>**DO:** Use lines to separate rows ![DO: Rows]({{{siteUrl}}}/assets/rowdo.svg)</li>
		<li class='dont'>**DON'T:** Use background fills to separate rows ![DON'T: Rows]({{{siteUrl}}}/assets/rowdont.svg)</li>
		<li class='do'>**DO:** Place totals as the last row with a `2px` stroke and bold the text if the items in the table are added to equal the total ![DO: Totals]({{{siteUrl}}}/assets/totalsdo.svg)</li>
		<li class='do'>**DO:** Place totals as the first row with a `2px` stroke below and bold the text if the items in the total are not added from the other rows ![DO: Totals]({{{siteUrl}}}/assets/totalsdo2.svg)</li>
		<li class='do'>**DO:** Call out positive trends ![DO: Trends]({{{siteUrl}}}/assets/trendsdo.svg)</li>
		<li class='dont'>**DON'T:** Call out negative trends ![DON'T: Trends]({{{siteUrl}}}/assets/trendsdont.svg)</li>
	</ul>
</details>

## Accessibility

We aspire to meet the WCAG 2.0 AA Standards.

## Resources

### Links

- List some helpful [links](https://www.youtube.com/watch?v=S73swRzxs8Y) here.

## Data States

Provide a clear and reassuring way to communicate to a user the status of their report, when an error occurred, data is still being gathered, or there is no data.

<!-- - **Jump to:**
	- [Loading](#loading)
	- [Zero Data](#zero-data)
	- [Gathering Data](#gathering-data)
	- [Data Error](#data-error)
	- [Partial Data](#partial-data)
	- [Backfill](#backfill)
	- [Unselected](#unselected) -->

<details>
	<summary>**Loading**</summary>

	Use a branded loader for main sections. If a branded loader is not provided, fall back to a generic loader.

	![Chart Loading]({{{siteUrl}}}/assets/state-loading-chart.svg)
	![Bambu Chart Loading]({{{siteUrl}}}/assets/state-loading-bambu.svg)
	![Fallback Loader]({{{siteUrl}}}/assets/state-loading-fallback.svg)
	![Donut Loading]({{{siteUrl}}}/assets/state-loading-donut.svg)
	![Horizontal Loading]({{{siteUrl}}}/assets/state-loading-horizontal.svg)
	![Influencers Loading]({{{siteUrl}}}/assets/state-loading-influencers.svg)
	![Overview Loading]({{{siteUrl}}}/assets/state-loading-overview.svg)
	![Table Loading]({{{siteUrl}}}/assets/state-loading-table.svg)
	![Word Cloud Loading]({{{siteUrl}}}/assets/state-loading-word-cloud.svg)
</details>

<details>
	<summary>**Zero Data**</summary>

	![Chart Zero Data]({{{siteUrl}}}/assets/state-zero-chart.svg)
	![Donut Zero Data]({{{siteUrl}}}/assets/state-zero-donut.svg)
	![Horizontal Bar Zero Data]({{{siteUrl}}}/assets/state-zero-horizontal-bar.svg)
	![Influencers Zero Data]({{{siteUrl}}}/assets/state-zero-influencers.svg)
	![Table Zero Data]({{{siteUrl}}}/assets/state-zero-table.svg)
	![Word Cloud Zero Data]({{{siteUrl}}}/assets/state-zero-word-cloud.svg)
</details>

<details>
	<summary>**Gathering Data**</summary>

	![Chart Gathering]({{{siteUrl}}}/assets/state-gathering-chart.svg)
	![Donut Gathering]({{{siteUrl}}}/assets/state-gathering-donut.svg)
	![Horizontal Bar Gathering]({{{siteUrl}}}/assets/state-gathering-horizontal-bar.svg)
	![Influencers Gathering]({{{siteUrl}}}/assets/state-gathering-influencers.svg)
	![Multi Select Gathering]({{{siteUrl}}}/assets/state-gathering-multi-select.svg)
	![Overview Gathering]({{{siteUrl}}}/assets/state-gathering-overview.svg)
	![Table Gathering]({{{siteUrl}}}/assets/state-gathering-table.svg)
	![Word Cloud Gathering]({{{siteUrl}}}/assets/state-gathering-word-cloud.svg)
</details>

<details>
	<summary>**Data Error**</summary>

	![Chart Error]({{{siteUrl}}}/assets/state-error-chart.svg)
	![Donut Error]({{{siteUrl}}}/assets/state-error-donut.svg)
	![Horizontal Bar Error]({{{siteUrl}}}/assets/state-error-horizontal-bar.svg)
	![Influencers Error]({{{siteUrl}}}/assets/state-error-influencers.svg)
	![Multi Select Error]({{{siteUrl}}}/assets/state-error-multi-select.svg)
	![Overview Error]({{{siteUrl}}}/assets/state-error-overview.svg)
	![Table Error]({{{siteUrl}}}/assets/state-error-table.svg)
	![Word Cloud Error]({{{siteUrl}}}/assets/state-error-word-cloud.svg)
</details>

<details>
	<summary>**Partial Data**</summary>

	![Area Chart]({{{siteUrl}}}/assets/state-partial-area.svg)
	![Chart]({{{siteUrl}}}/assets/state-partial-chart.svg)
	![Donut Chart Gathering Data]({{{siteUrl}}}/assets/state-partial-donut-gathering.svg)
	![Donut Chart Missing Data]({{{siteUrl}}}/assets/state-partial-donut-missing.svg)
	![Table Missing Data]({{{siteUrl}}}/assets/state-partial-table-missing.svg)
	![Table Partial Data]({{{siteUrl}}}/assets/state-partial-table.svg)
</details>

<details>
	<summary>**Backfill**</summary>

	![Chart]({{{siteUrl}}}/assets/state-backfill-chart.svg)
	![Table]({{{siteUrl}}}/assets/state-backfill-table.svg)
</details>

<details>
	<summary>**Unselected**</summary>

	![Multi select chart]({{{siteUrl}}}/assets/state-unselected-multi-select-chart.svg)
</details>
