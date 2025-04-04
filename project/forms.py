from django import forms
from django.core.validators import MinLengthValidator, MaxLengthValidator, EmailValidator
from django.core.exceptions import ValidationError
from .models import User, Department, Role #Import all your model.

class EmployeeForm(forms.Form):
    first_name = forms.CharField(
        label="First Name",
        max_length=12,
        min_length=3,
        validators=[
            MinLengthValidator(4, message="First name must be at least 4 characters long."),
            MaxLengthValidator(12, message="First name cannot exceed 12 characters."),
        ],
        widget=forms.TextInput(attrs={'placeholder': "Enter First Name"})  # Example widget
    )
    last_name = forms.CharField(
        label="Last Name",
        max_length=12,
        min_length=3,
        validators=[
            MinLengthValidator(4, message="Last name must be at least 4 characters long."),
            MaxLengthValidator(12, message="Last name cannot exceed 12 characters."),
        ],
        widget=forms.TextInput(attrs={'placeholder': "Enter Last Name"}) 
    )
    email = forms.CharField(
        label="Email Address",
        widget=forms.EmailInput(attrs={'placeholder': "Enter Email Address"}),
        validators=[EmailValidator(message="Enter a valid email address.")] 
    )
    phone_number = forms.CharField(
        label="Phone Number",
        max_length=12,
        min_length=10,
        validators=[
            MinLengthValidator(10, message="Phone number must be at least 10 digits."),
            MaxLengthValidator(12, message="Phone number cannot exceed 12 digits."),
            ],
        widget=forms.TextInput(attrs={'placeholder': "Enter Phone Number"})
    )

    department = forms.ModelChoiceField(
        queryset=Department.objects.all(),  
        empty_label="-- Select Department --",
        label="Department"
    )
        
    role = forms.ModelChoiceField(
        queryset=Role.objects.all(),
        empty_label="-- Select Role --",
        label="Role"
    )
    
    profile_image = forms.FileField(
        label="Profile Image",
        required=False,  
    )

   
    def clean_phone_number(self):
        phone_number = self.cleaned_data.get('phone_number')
        if not phone_number.isdigit(): 
            raise ValidationError("Phone number must contain only digits.")
        return phone_number

    