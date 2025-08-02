# React Hook Form Implementation

This document describes the React Hook Form implementation in the Hotel Booking Application frontend.

## Overview

The application now uses React Hook Form for all form handling, providing:
- Better performance with minimal re-renders
- Built-in validation with Yup schemas
- Consistent error handling
- Reusable form components
- Type safety with TypeScript

## Dependencies

```json
{
  "react-hook-form": "^7.x.x",
  "@hookform/resolvers": "^3.x.x",
  "yup": "^1.x.x"
}
```

## File Structure

```
src/
├── lib/
│   └── hooks/
│       └── useFormValidation.ts    # Custom hooks and validation schemas
├── components/
│   ├── ui/
│   │   ├── FormInput.tsx          # Reusable form input component
│   │   └── FormButton.tsx         # Reusable form button component
│   ├── LoginForm.tsx              # Updated login form
│   ├── SignupForm.tsx             # Updated signup form
│   ├── AddHotelForm.tsx           # Updated add hotel form
│   └── EditHotelForm.tsx          # Updated edit hotel form
```

## Custom Hooks

### useFormValidation.ts

This file contains all the validation schemas and custom hooks for different form types:

#### Validation Schemas
- `loginSchema`: Email and password validation
- `signupSchema`: Registration form validation with password confirmation
- `hotelSchema`: Hotel creation form validation
- `editHotelSchema`: Hotel editing form validation

#### Custom Hooks
- `useLoginForm()`: Returns configured form for login
- `useSignupForm()`: Returns configured form for signup
- `useHotelForm()`: Returns configured form for adding hotels
- `useEditHotelForm()`: Returns configured form for editing hotels

#### Utility Functions
- `handleFormError()`: Standardized error handling for forms

## Reusable Components

### FormInput Component

A flexible input component that supports:
- Text inputs
- Textareas
- File inputs
- Error display
- Labels with required indicators
- Custom styling

```tsx
<FormInput
    label="Email Address"
    name="email"
    type="email"
    placeholder="Enter your email"
    error={errors.email}
    required
    {...register('email')}
/>
```

### FormButton Component

A button component with:
- Multiple variants (primary, secondary, danger)
- Loading states
- Different sizes
- Consistent styling

```tsx
<FormButton
    type="submit"
    loading={isSubmitting}
    loadingText="Signing in..."
    variant="primary"
    size="lg"
>
    Sign In
</FormButton>
```

## Form Implementation Examples

### Login Form

```tsx
const LoginForm = () => {
    const { login } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = useLoginForm();

    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password);
        } catch (err) {
            handleFormError(setError, err, 'Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
                name="email"
                type="email"
                error={errors.email}
                {...register('email')}
            />
            <FormButton
                type="submit"
                loading={isSubmitting}
                loadingText="Signing in..."
            >
                Sign In
            </FormButton>
        </form>
    );
};
```

### Hotel Form with File Upload

```tsx
const AddHotelForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        watch
    } = useHotelForm();

    const photoFile = watch('photo');

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
                label="Hotel Photo"
                name="photo"
                type="file"
                accept="image/*"
                error={errors.photo}
                {...register('photo')}
            />
            <FormInput
                label="Hotel Name"
                name="name"
                type="text"
                error={errors.name}
                {...register('name')}
            />
            <FormInput
                label="Details"
                name="details"
                type="textarea"
                error={errors.details}
                {...register('details')}
            />
        </form>
    );
};
```

## Validation Rules

### Login Form
- Email: Required, valid email format
- Password: Required, minimum 6 characters

### Signup Form
- Name: Required, minimum 2 characters
- Email: Required, valid email format
- Password: Required, minimum 6 characters
- Confirm Password: Required, must match password
- Phone: Required, valid phone number format

### Hotel Forms
- Name: Required, minimum 2 characters
- Location: Required, minimum 5 characters
- Details: Required, minimum 10 characters
- Photo: Required for new hotels, optional for editing

## Error Handling

All forms use the `handleFormError` utility function for consistent error handling:

```tsx
const handleFormError = (setError, error, defaultMessage) => {
    setError('root', {
        type: 'manual',
        message: error.response?.data?.message || error.message || defaultMessage
    });
};
```

## Benefits

1. **Performance**: React Hook Form minimizes re-renders by using uncontrolled components
2. **Validation**: Built-in validation with Yup schemas
3. **Type Safety**: Full TypeScript support
4. **Reusability**: Custom hooks and components can be reused across forms
5. **Consistency**: Standardized error handling and styling
6. **Maintainability**: Centralized validation logic and form configuration

## Migration Notes

The forms were migrated from useState-based state management to React Hook Form:
- Removed individual state variables for form fields
- Replaced onChange handlers with register function
- Centralized validation logic in custom hooks
- Standardized error handling across all forms
- Added reusable UI components for consistency 