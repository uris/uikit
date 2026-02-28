# Component Performance Benchmark Report

**Generated:** 2026-02-28T03:06:54.979Z
**Duration:** 44.33s
**Components Tested:** 34

---

## Performance Summary

| Component | Rating | Mount (avg) | Re-render (avg) | Event (avg) | Memory Delta | Leak Suspected |
|-----------|:------:|-------------|-----------------|-------------|--------------|:--------------:|
| Avatar | ⚡ | 0.381ms | 0.0962ms | - | 3.13KB | ✓ No |
| AvatarGroup | ⚡ | 0.655ms | 0.259ms | - | 2.24KB | ✓ No |
| Badge | ⚡ | 0.398ms | 0.0795ms | - | 2.52KB | ✓ No |
| CheckBox | ⚡ | 1.277ms | 0.988ms | 0.594ms | 2.98KB | ✓ No |
| DivInput | ⚡ | 0.403ms | 0.239ms | 0.288ms | 2.68KB | ✓ No |
| DocIcon | ⚡ | 0.599ms | 0.249ms | - | 2.54KB | ✓ No |
| Dot | ⚡ | 0.182ms | 0.0495ms | - | 3.06KB | ✓ No |
| DraggablePanel | ⚡ | 1.436ms | 0.353ms | - | 2.85KB | ✓ No |
| DropDown | ⚡ | 1.279ms | 0.238ms | 0.0679ms | 2.49KB | ✓ No |
| EditorButtonBar | ✓ | 6.716ms | 1.970ms | - | 2.76KB | ✓ No |
| ErrorSummary | ⚡ | 0.252ms | 0.132ms | - | 2.59KB | ✓ No |
| FlexDiv | ⚡ | 0.905ms | 0.529ms | - | - | - |
| Grouper | ⚡ | 0.547ms | 0.299ms | - | 2.97KB | ✓ No |
| Icon | ⚡ | 1.102ms | 0.217ms | - | 3.08KB | ✓ No |
| IconButton | ⚡ | 0.494ms | 0.182ms | 0.0351ms | 2.24KB | ✓ No |
| Logos | ✓✓ | 2.293ms | 0.433ms | - | 2.96KB | ✓ No |
| MessageInput | ✓✓ | 4.316ms | 3.166ms | 1.977ms | 2.58KB | ✓ No |
| Overlay | ⚡ | 0.191ms | 0.106ms | - | 2.43KB | ✓ No |
| Pager | ⚡ | 1.674ms | 1.515ms | 0.460ms | 3.37KB | ✓ No |
| Progress | ⚡ | 0.181ms | 0.109ms | - | 3.05KB | ✓ No |
| RadioButton | ⚡ | 0.564ms | 0.422ms | 0.453ms | 3.30KB | ✓ No |
| RadioButtonList | ⚡ | 0.910ms | 0.812ms | 0.0380ms | 3.17KB | ✓ No |
| Slider | ⚡ | 0.503ms | 0.123ms | 0.0652ms | 3.00KB | ✓ No |
| Spacer | ⚡ | 0.287ms | 0.148ms | - | 2.96KB | ✓ No |
| Switch | ⚡ | 0.478ms | 0.388ms | 0.481ms | 3.19KB | ✓ No |
| TabBar | ⚡ | 0.541ms | 0.263ms | 0.0400ms | 2.77KB | ✓ No |
| TextArea | ⚡ | 0.479ms | 0.313ms | 0.361ms | 3.27KB | ✓ No |
| TextField | ⚡ | 0.511ms | 0.304ms | 0.341ms | 3.63KB | ✓ No |
| UIButton | ⚡ | 1.558ms | 0.969ms | 0.0462ms | 2.37KB | ✓ No |
| UIButtonBar | ⚡ | 1.610ms | 1.338ms | 0.0269ms | 3.10KB | ✓ No |
| UICard | ⚡ | 0.262ms | 0.0660ms | - | 2.57KB | ✓ No |
| UIChip | ⚡ | 0.390ms | 0.0898ms | 0.0790ms | 2.58KB | ✓ No |
| UIFileIcon | ⚡ | 0.596ms | 0.332ms | - | 3.09KB | ✓ No |
| UILabel | ⚡ | 0.477ms | 0.103ms | - | 2.25KB | ✓ No |

---

*Note: Memory measurements are simulated in jsdom test environment. Run in browser for actual memory measurements.*

*Rating: ⚡ Excellent (<2ms) | ✓✓ Very Good (2-5ms) | ✓ Good (5-16ms) | ⚠️ Fair (16-50ms) | ❌ Poor (>50ms)*
