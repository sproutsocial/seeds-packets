## Terminology

When talking about depth and its related concepts, it is important for us to use consistent language.

**Depth** - refers to the *visual* representation of depth, i.e. box-shadows. This does not have a 1:1 relationship with physical Z-Indices.

**Plane** - represents the *actual* physical depth (1:1 with Z-Indices) relative to the **Base Plane**. All components exist within a depth of elevation, regardless of the presence of visual **depth**.

**Layer** - represents a grouping of **planes** that are displayed in a single view.

**Base Plane** - refers to any **plane** that, for all intents and purposes, can be considered to have a `Z-Index: 0`. A Base Plane acts as a "reset" of the stacked UI hierarchy.