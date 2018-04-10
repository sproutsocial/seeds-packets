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
