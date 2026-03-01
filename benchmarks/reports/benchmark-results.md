# Component Performance Benchmark Report

**Generated:** 2026-02-28T03:29:53.676Z
**Duration:** 44.97s
**Components Tested:** 34

---

## Performance Summary

| Component | Rating | Mount (avg) | Re-render (avg) | Event (avg) | Memory Delta | Leak Suspected |
|-----------|:------:|-------------|-----------------|-------------|--------------|:--------------:|
| Avatar | ⚡ | 0.378ms | 0.0978ms | - | 3.05KB | ✓ No |
| AvatarGroup | ⚡ | 0.983ms | 0.372ms | - | 3.17KB | ✓ No |
| Badge | ⚡ | 0.466ms | 0.101ms | - | 2.37KB | ✓ No |
| CheckBox | ⚡ | 1.193ms | 0.792ms | 0.549ms | 3.21KB | ✓ No |
| DivInput | ⚡ | 0.471ms | 0.274ms | 0.317ms | 3.04KB | ✓ No |
| DocIcon | ⚡ | 0.548ms | 0.275ms | - | 3.23KB | ✓ No |
| Dot | ⚡ | 0.375ms | 0.0830ms | - | 3.13KB | ✓ No |
| DraggablePanel | ⚡ | 1.222ms | 0.313ms | - | 3.09KB | ✓ No |
| DropDown | ⚡ | 1.299ms | 0.253ms | 0.0685ms | 3.56KB | ✓ No |
| EditorButtonBar | ✓ | 6.557ms | 1.967ms | - | 2.52KB | ✓ No |
| ErrorSummary | ⚡ | 0.414ms | 0.139ms | - | 2.47KB | ✓ No |
| FlexDiv | ⚡ | 1.173ms | 0.549ms | - | - | - |
| Grouper | ⚡ | 0.557ms | 0.283ms | - | 3.14KB | ✓ No |
| Icon | ⚡ | 0.907ms | 0.206ms | - | 2.73KB | ✓ No |
| IconButton | ⚡ | 0.934ms | 0.270ms | 0.0611ms | 3.09KB | ✓ No |
| Logos | ✓✓ | 2.011ms | 0.473ms | - | 2.74KB | ✓ No |
| MessageInput | ✓✓ | 4.139ms | 3.438ms | 1.667ms | 3.18KB | ✓ No |
| Overlay | ⚡ | 0.451ms | 0.227ms | - | 3.26KB | ✓ No |
| Pager | ✓✓ | 2.258ms | 1.589ms | 0.439ms | 3.21KB | ✓ No |
| Progress | ⚡ | 0.374ms | 0.212ms | - | 3.04KB | ✓ No |
| RadioButton | ⚡ | 1.040ms | 0.613ms | 0.716ms | 2.94KB | ✓ No |
| RadioButtonList | ⚡ | 1.783ms | 1.092ms | 0.0433ms | 2.88KB | ✓ No |
| Slider | ⚡ | 0.598ms | 0.136ms | 0.107ms | 2.85KB | ✓ No |
| Spacer | ⚡ | 0.311ms | 0.111ms | - | 2.49KB | ✓ No |
| Switch | ⚡ | 0.509ms | 0.603ms | 0.319ms | 2.50KB | ✓ No |
| TabBar | ⚡ | 0.657ms | 0.340ms | 0.0523ms | 2.09KB | ✓ No |
| TextArea | ⚡ | 0.522ms | 0.232ms | 0.252ms | 2.11KB | ✓ No |
| TextField | ⚡ | 0.559ms | 0.368ms | 0.395ms | 2.71KB | ✓ No |
| UIButton | ⚡ | 1.526ms | 0.937ms | 0.0668ms | 2.59KB | ✓ No |
| UIButtonBar | ⚡ | 1.347ms | 1.169ms | 0.0300ms | 2.32KB | ✓ No |
| UICard | ⚡ | 0.302ms | 0.0509ms | - | 3.49KB | ✓ No |
| UIChip | ⚡ | 0.396ms | 0.109ms | 0.122ms | 2.78KB | ✓ No |
| UIFileIcon | ⚡ | 0.632ms | 0.244ms | - | 3.11KB | ✓ No |
| UILabel | ⚡ | 0.527ms | 0.105ms | - | 3.50KB | ✓ No |

---

*Note: Memory measurements are simulated in jsdom test environment. Run in browser for actual memory measurements.*

*Rating: ⚡ Excellent (<2ms) | ✓✓ Very Good (2-5ms) | ✓ Good (5-16ms) | ⚠️ Fair (16-50ms) | ❌ Poor (>50ms)*
