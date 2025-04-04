from django.shortcuts import render, redirect, get_object_or_404
from django.utils.dateparse import parse_date
from .models import *
from django.contrib import messages
from django.core.exceptions import ValidationError
from .forms import EmployeeForm
import datetime

# ==========================
# General Views
# ==========================
def index(request):
    return render(request, "index.html")

# ==========================
# Task Views
# ==========================
def task_view(request):
    tasks = Task.objects.all()
    context = {'tasks': tasks}
    return render(request, "task/tasks.html")

def modifyTask(request):
    return render(request, 'modifyTask.html')

def create_task(request):
    if request.method == "POST":
        task_name = request.POST.get("task_name")
        project_id = request.POST.get("project_id")
        module_id = request.POST.get("module_id")
        department_id = request.POST.get("department_id")
        manager_id = request.POST.get("manager_id")
        employee_id = request.POST.get("employee_id")
        start_date = request.POST.get("start_date")
        end_date = request.POST.get("end_date")
        status = request.POST.get("status")
        description = request.POST.get("description")
        reference_document = request.FILES.get("reference_document")

        if not all([task_name, project_id, module_id, department_id, manager_id, employee_id]):
            return render(request, "task/createTask.html", {
                "error": "All fields are required.",
                "projects": Project.objects.all(),
                "modules": Module.objects.all(),
                "departments": Department.objects.all(),
                "employees": Employee.objects.all().values("id", "full_name"),
                "managers": Employee.objects.filter(role="Manager").values("id", "full_name"),
            })

        try:
            project = get_object_or_404(Project, id=project_id)
            module = get_object_or_404(Module, id=module_id)
            department = get_object_or_404(Department, id=department_id)
            manager = get_object_or_404(Employee, id=manager_id)
            employee = get_object_or_404(Employee, id=employee_id)

            start_date = parse_date(start_date) if start_date else None
            end_date = parse_date(end_date) if end_date else None

            Task.objects.create(
                name=task_name,
                project=project,
                module=module,
                department=department,
                assigned_to=employee,
                assigned_by=manager,
                start_date=start_date,
                due_date=end_date,
                status=status,
                description=description,
                reference_document=reference_document,
            )
            return redirect("task_list")
        except Exception as e:
            return render(request, "task/createTask.html", {
                "error": f"Error creating task: {str(e)}",
                "projects": Project.objects.all(),
                "modules": Module.objects.all(),
                "departments": Department.objects.all(),
                "employees": Employee.objects.all(),
                "managers": Employee.objects.filter(role__iexact="Manager"),
            })

    context = {
        "projects": Project.objects.all(),
        "modules": Module.objects.all(),
        "departments": Department.objects.all(),
        "employees": Employee.objects.all(),
        "managers": Employee.objects.filter(role="Manager"),
    }
    return render(request, "task/createTask.html", context)

class TaskView:
    def showTask(request):
        return render(request, "task/showTask.html")

    def modifyTask(request):
        return render(request, "task/modifyTask.html")

    def taskGraph(request):
        return render(request, "task/task_graph.html")

# ==========================
# Project Views
# ==========================
class ProjectView:
    def project(request):
        depar = Department.objects.all()
        proj = Project.objects.all()
        stats = Status.objects.all()
        if request.method == "GET":
            project_id = request.GET.get('project_id')
            department = request.GET.get('department')
            status = request.GET.get('status')
            date_range = request.GET.get('date_range')

            if project_id:
                proj = proj.filter(pk=project_id)
            if department:
                proj = proj.filter(department=department)
            if status:
                proj = proj.filter(status=status)
            if date_range:
                try:
                    start_date, end_date = [datetime.datetime.strptime(d.strip(), "%m/%d/%Y").date() for d in date_range.split(' to ')]
                    proj = proj.filter(start_date__lte=end_date, end_date__gte=start_date)
                except ValueError:
                    print("Invalid date range format")

            return render(request, "project/project.html", {"depart": depar, "projec": proj, "statu": stats})

    def create_project(request):
        stat = {"running": "running", "pending": "pending", "completed": "completed"}
        department = Department.objects.all()
        project = Project.objects.all()
        managers = User.objects.filter(role__name__icontains="manager")

        if request.method == "POST":
            project_name = request.POST.get('project_name')
            department_id = request.POST.get('department')
            project_manager = request.POST.get('project_manager')
            status = request.POST.get('status')
            start_date = request.POST.get('start_date')
            end_date = request.POST.get('end_date')
            reference_document = request.FILES.get('reference_document')
            description = request.POST.get('description')

            department = None
            if department_id:
                department = get_object_or_404(Department, pk=department_id)

            try:
                Project.objects.create(
                    department=department,
                    name=project_name,
                    project_manager=get_object_or_404(User, pk=project_manager),
                    start_date=start_date,
                    end_date=end_date,
                    reference_document=reference_document,
                    description=description,
                )
                return render(request, 'project/project.html', {"depar": department, "proj": project, "stat": stat, "managers": managers})
            except Exception as e:
                print(e)
                context = {"departments": department, "errorMessage": (e)}
                return render(request, 'project/project.html', context)

        return render(request, "project/createProject.html", {"depar": department, "proj": project, "stat": stat, "managers": managers})

    def modifyProject(request):
        return render(request, "project/modifyProject.html")

    def holdProject(request):
        return render(request, "project/holdProject.html")

    def showProject(request):
        proj = Project.objects.all()
        if request.method == "GET":
            project_name = request.GET.get('project_name')
            project_status = request.GET.get('project_status')
            priority = request.GET.get('priority')
            assigned_department = request.GET.get('assigned_department')
            assigned_manager = request.GET.get('assigned_manager')

            if project_name:
                proj = proj.filter(name__iexact=project_name)
            if project_status:
                proj = proj.filter(status__iexact=project_status)
            if priority:
                proj = proj.filter(priority__iexact=priority)
            if assigned_department:
                proj = proj.filter(department__id=assigned_department)
            if assigned_manager:
                proj = proj.filter(project_manager__id=assigned_manager)

            return render(request, "project/showProject.html", {"projec": proj})

    def deleteProject(request):
        return render(request, "project/deleteProject.html")

# ==========================
# Department Views
# ==========================
class DepartmentView:
    def department(request):
        if request.method == "GET":
            module_id = request.GET.get('module_id')
            depart = Department.objects.all()
            if module_id:
                depart = depart.filter(department_id=module_id)
            return render(request, "department/department.html", {"depart": depart})

    def createDepartment(request):
        if request.method == "POST":
            d_name = request.POST.get('d_name')
            description = request.POST.get('description')
            Department.objects.create(department_name=d_name, description=description)
            return redirect('department')
        return render(request, "department/createDepartment.html")

    def departmentEmployee(request):
        return render(request, "department/department_employee.html")

    def showDepartment(request, department_id):
        if department_id:
            department = get_object_or_404(Department, pk=department_id)
            context = {"department": department}
            return render(request, 'department/department.html', context)

    def modifydepartment(request):
        return render(request, "department/modifyDepartment.html")

# ==========================
# Module Views
# ==========================
class ModuleView:
    def module(request):
        return render(request, "module/module.html")

    def createModule(request):
        projects = Project.objects.all()
        departments = Department.objects.all()
        users = User.objects.all()

        if request.method == "POST":
            module_name = request.POST.get('module_name')
            project_id = request.POST.get('project')
            assigned_by_id = request.POST.get('assigned_by')
            assigned_to_id = request.POST.get('assigned_to')
            estimated_date = request.POST.get('estimated_date')
            description = request.POST.get('description')
            department_id = request.POST.get('department')

            project = get_object_or_404(Project, pk=project_id)
            assigned_to = get_object_or_404(User, pk=assigned_to_id)
            assigned_by = get_object_or_404(User, pk=assigned_by_id)
            department = get_object_or_404(Department, pk=department_id)

            Module.objects.create(
                name=module_name,
                end_date=estimated_date,
                project=project,
                assigned_to=assigned_to,
                assigned_by=assigned_by,
                description=description,
                department=department,
            )
            return redirect('module')

        managers = User.objects.filter(role__name='Manager')
        context = {
            'projects': projects,
            'departments': departments,
            'users': users,
            'managers': managers,
        }
        return render(request, "module/createModule.html", context)

    def holdModule(request):
        return render(request, "module/holdModule.html")

    def modifyModule(request):
        return render(request, "module/modifyModule.html")

    def moduleGraph(request):
        return render(request, "module/module_graph.html")

    def showModule(request):
        return render(request, "module/showModule.html")

# ==========================
# Role Views
# ==========================
class RoleView:
    def role(request):
        role_v = Role.objects.all().select_related('department')
        depar = Department.objects.all()

        if request.method == "GET":
            department_p = request.GET.get('department')
            role = request.GET.get('role')
            search = request.GET.get('search')

            if department_p:
                role_v = role_v.filter(department_id=department_p)
            if role:
                role_v = role_v.filter(name__iexact=role)
            if search:
                role_v = role_v.filter(name__icontains=search)

        return render(request, "role/role.html", {"role_z": role_v, "departments": depar})

    def createRole(request):
        depart = Department.objects.all()
        if request.method == "POST":
            department_id = request.POST.get('department')
            role_name = request.POST.get('role_name')
            reference_document = request.FILES.get('reference_document')
            description = request.POST.get('description')

            department = None
            if department_id:
                department = get_object_or_404(Department, pk=department_id)

            try:
                Role.objects.create(
                    name=role_name,
                    description=description,
                    department=department,
                    reference_document=reference_document,
                )
                return redirect("role")
            except Exception as e:
                print(e)
                context = {"departments": depart, "errorMessage": (e)}
                return render(request, 'role/CreateRole.html', context)

        return render(request, "role/createRole.html", {"department": depart})

    def viewRole(request, role_id):
        role = get_object_or_404(Role, id=role_id)
        return render(request, "role/view_role.html", {"role": role})

    def modifyRole(request):
        return render(request, "role/modify_role.html")

# ==========================
# Permission Views
# ==========================
class PermissionView:
    def permission(request):
        return render(request, "permission/permission.html")

# ==========================
# User Views
# ==========================
class UserView:
    def user(request):
        department = Department.objects.all()
        role_v = Role.objects.all()
        user = User.objects.all()

        if request.method == "POST":
            userId = request.POST.get('user_id')
            user_name = request.POST.get('user_name')
            depart = request.POST.get('department')
            role = request.POST.get('role')
            status = request.POST.get('status')
            joining_date = request.POST.get('joining_date')

            users = User.objects.all()
            if userId:
                users = users.filter(id=userId)
            if user_name:
                users = users.filter(username=user_name)
            if depart:
                users = users.filter(department=depart)
            if role:
                users = users.filter(role=role)
            if status:
                users = users.filter(status=status)
            if joining_date:
                users = users.filter(date_joined=joining_date)

            return render(request, "user/user.html", {"users": users, 'department': department, "role": role_v})

        return render(request, "user/user.html", {'department': department, "users": user, "role": role_v})

    def createUser(request):
        departments = Department.objects.all()
        roles = Role.objects.all()

        if request.method == "POST":
            form = EmployeeForm(request.POST, request.FILES)
            if form.is_valid():
                new_user = User(
                    first_name=form.cleaned_data['first_name'],
                    last_name=form.cleaned_data['last_name'],
                    email=form.cleaned_data['email'],
                    phone_number=form.cleaned_data['phone_number'],
                    department=form.cleaned_data['department'],
                    role=form.cleaned_data['role'],
                    profile_image=form.cleaned_data['profile_image'],
                )
                new_user.username = new_user.email
                new_user.save()
                return redirect('user')
            else:
                context = {"form": form, "depart": departments, "role": roles}
                return render(request, "user/createUser.html", context)

        else:
            form = EmployeeForm()
            context = {"form": form, "depart": departments, "role": roles}
            return render(request, "user/createUser.html", context)

    def userdetail(request, user_id=None):
        if user_id:
            user = get_object_or_404(User, pk=user_id)
            context = {'user': user}
            return render(request, "user/userDetail.html", context)
        else:
            e_name = request.GET.get('e_name')
            department = request.GET.get('department')
            role = request.GET.get('role')
            status = request.GET.get('status')

            users = User.objects.all()
            if e_name:
                users = users.filter(first_name=e_name)
            if department:
                users = users.filter(department=department)
            if role:
                users = users.filter(role=role)
            if status:
                users = users.filter(status=status)

            return render(request, "user/userDetail.html", {"users": users})

    def usermodify(request):
        return render(request, "user/modifyUser.html")

# ==========================
# User Log Views
# ==========================
class UserLogView:
    def log(request):
        return render(request, "log/log.html")

# ==========================
# Authentication Views
# ==========================
class AuthenticationView:
    def adminlogin(request):
        return render(request, "Authentication/login.html")

    def adminlogout(request):
        return render(request, "Authentication/login.html")

    def adminSignup(request):
        return render(request, "authentication/signup.html")