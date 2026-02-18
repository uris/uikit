# Maya UIKit

A comprehensive React component library and theming system for building modern applications with styled-components.

## Overview

Maya UIKit provides a complete set of UI components and a flexible theming system to accelerate application development. The library includes 30+ production-ready components ranging from basic inputs to complex interactive elements, all built with TypeScript for type safety and developer experience.

### Components

The UIKit includes a wide range of components for common UI patterns:

**Form Elements:**
- TextField, TextArea, DivInput - Text input components with validation support
- CheckBox, RadioButton, RadioButtonList - Selection controls
- Switch, Slider - Toggle and range inputs
- DropDown - Customizable dropdown menus

**Buttons & Navigation:**
- UIButton, IconButton - Primary action components
- TabBar - Tab navigation with customizable options
- Pager - Pagination controls

**Feedback & Status:**
- Badge - Status indicators and labels
- Dot - Simple status dots
- ProgressIndicator, DoneCheck - Loading and completion states
- ProgressBar - Multi-step progress visualization
- ErrorSummary - Error message display

**Content Display:**
- Avatar, AvatarGroup - User avatars with grouping
- UIChip - Dismissible tags and labels
- UILabel - Styled text labels
- Overlay - Modal overlays

**Icons & Media:**
- Icon - Comprehensive icon set with IconNames
- UIFileIcon - File type icons
- DocIcons - Document type indicators
- Logos - Brand logos

**Layout & Organization:**
- FlexDiv - Flexible layout container
- Spacer - Spacing utility
- Grouper - Content grouping
- DraggablePanel - Draggable UI panels

**Advanced Components:**
- MessageInput - Rich message input with document upload
- EditorButtonBar - Text editor toolbar
- ToolTip - Contextual tooltips

### Theming System

The library includes a powerful theming system with:

- **Pre-built Themes:** Light and dark themes out of the box
- **Theme Hook:** `useGiaThemes` for easy theme switching
- **Type-safe Theme Objects:** Full TypeScript support for theme customization
- **Comprehensive Styling:** Colors, typography, corners, and legacy style support

Theme exports include:
- `lightTheme` / `darkTheme` - Complete theme objects
- `light` / `dark` - Theme configurations
- `GiaTheme`, `LyraColors`, `LyraTypeStyles` - Type definitions

## Installation

```bash
npm install maya-uikit
```

### Peer Dependencies
You will need to manage your own version of react, react-dom,
styled-components and motion. Your project must have
the following dependencies installed:

```bash
npm install react react-dom styled-components motion