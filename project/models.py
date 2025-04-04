from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.conf import settings


class Department(models.Model):
    department_name = models.CharField(max_length=255, unique=True)
    description = models.TextField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.department_name


class Role(models.Model):
    name = models.CharField(max_length=30, unique=True)
    group = models.OneToOneField(Group, on_delete=models.CASCADE , null=True , blank= True)
    description = models.TextField(blank=True, null=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE )
    reference_document = models.FileField(
        upload_to="project/uploads/", blank=True, null=True
    )
    
    def __str__(self):
        return self.name


class User(AbstractUser):
    email = models.EmailField(null=False, blank=True)
    is_active = models.BooleanField(default=True)
    
    permission = models.ManyToManyField(
        Permission, related_name="customer_user_permission", blank=True
    )
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    profile_image = models.FileField(upload_to='project/uploads/' , null=True, blank=True)
    
    def get_full_name(self):
        return super().get_full_name()
    def __str__(self):
        return f"{self.id} - {self.username} - {self.get_full_name()}"


class UserDepartmentRole(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.department.department_name} - {self.role.name}"


class Status(models.Model):
    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Running", "Running"),
        ("To-Do", "To-Do"),
        ("Complete", "Complete"),
    ]

    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default="Running")

    def __str__(self):
        return self.status #This was name and the status model did not have it.
    
    class meta:
        abstract = True


class Project(models.Model):
    name = models.CharField(max_length=255, null=True)
    description = models.TextField(blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    priority = models.CharField(max_length=255, blank=True, null=True)
    department = models.ForeignKey(
        Department, on_delete=models.SET_NULL, null=True, blank=True
    )
    project_manager = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={"groups__name": "Manager"},
        related_name="managed_projects",
    )
    status = models.ForeignKey(Status, on_delete=models.SET_NULL, null=True)

    reference_document = models.FileField(
        upload_to="project/uploads/", blank=True, null=True
    )

    def __str__(self):
        return self.name


class Module(models.Model):
    name = models.CharField(max_length=255, blank=False, unique=True)
    description = models.TextField(blank=True, null=True)
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, null=True, related_name="modules"
    )
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, null=True, blank=True)
    assigned_to = models.ForeignKey(User , on_delete=models.CASCADE ,related_name="modules_assigned")
    
    assigned_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='modules_created', null=True, blank=True) 

    def __str__(self):
        return f" {self.id} -{self.name} ({self.project.name})"


class Task(models.Model): # Removed Status
    name = models.CharField(max_length=255, blank=False, unique=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name="tasks")
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    status = models.ForeignKey(Status , on_delete=models.SET_NULL , null = True) #Make a relationship

    def __str__(self):
        return f"{self.name} ({self.module.name})"


class Employee(models.Model):
    ROLE_CHOICES = [
        ("Manager", "Manager"),
        ("Developer", "Developer"),
        ("QA", "QA"),
        ("Devops", "Devops"),
    ]

    full_name = models.CharField(max_length=255)
    role = models.CharField(max_length=255, choices=ROLE_CHOICES)
    department = models.ForeignKey(
        Department, on_delete=models.SET_NULL, null=True, related_name="employees"
    )

    def __str__(self):
        return self.full_name