# Arcade Switches Footprints

This repository contains kicad footprints for Sanwa SW-68 arcade microswitch variants and Seimitsu MM9 arcade microswitch variants, as well as their footprints with standard keyboard spacings (19mm, 18x17mm).

## Development

This respository uses pnpm for package management.

Install dependencies, and then run
```bash
pnpm gen
```
to auto-generate footprints with standard keyboard spacings in `Arcade_Switch_Keyboard.pretty/`.

You can add arcade switches footprint to `Arcade_Switch.pretty/` or add spacing files to `spacing/` to generate more footprints. Add entries to `excludeFootprint.json` to exclude them from autogeneration.

However, beware that spacing files in `spacing/` are **NOT** valid kicad footprints. They only contain the necessary footprint components to add into a valid kicad footprint for autogeneration.

## References

There are some references available in this repository regarding the arcade switches. See [`./doc/Switches.md`](./doc/Switches.md) for details.