# iOS Style Confirmation Sheet/Modal

Basically an alert modal for react-native applications. Styling is the same as iPhone's message swipe delete action.

## Usage

```typescript
<ConfirmationSheet description="This action cannot be undone.">
    <Pressable onPress={() => console.log('abc')}>
        <Text>Open modal</Text>
    </Pressable>
</ConfirmationSheet>
```

## Props

- `children`: A React element that extends the `PressableProps` and `RefAttributes<View>` interfaces from React Native. This is the trigger of the confirmation sheet.

- `description`: A string that describes the confirmation sheet.

- `onConfirm`: An optional function that is called when the confirmation button is pressed.

- `onCancel`: An optional function that is called when the cancel button or backdrop is pressed.

- `options`: An optional object that can have the following properties:
  - `descriptionStyle`: A style object for the description text.
  - `confirmText`: A string for the confirmation button text.
  - `confirmTextStyle`: A style object for the confirmation button text.
  - `cancelText`: A string for the cancel button text.
  - `cancelTextStyle`: A style object for the cancel button text.
