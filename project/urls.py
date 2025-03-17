from django.urls import path
from .views import *
from .views import Dashboard,Task,Module,Project,User,Permission,Role,Department,UserLog

urlpatterns = [
    path('', Dashboard.index, name='index'),

    # Task URLs
    path('task/', Task.task, name='task'),
    path('task/create/', Task.createTask, name='create_task'),
    path('task/show/', Task.showTask, name='show_task'),
    path('task/modify/', Task.modifyTask, name='modify_task'),
    path('task/graph/', Task.taskGraph, name='garph_task')
]
urlpatterns+=[
    # Project urls
    path('project/', Project.project, name='project'),
    path('project/create/', Project.createProject, name='create_project'),
    path('project/modify/', Project.modifyProject, name='modify_project'),
    path('project/hold/', Project.holdProject, name='hold_project'),
    path('project/show/', Project.showProject, name='show_project'),
    path('project/delete/', Project.deleteProject, name='delete_project'),
]
urlpatterns+=[
    # Module URLs
    path('module/', Module.module, name='module'),
    path('module/create/', Module.createModule, name='create_module'),
    path('module/hold/', Module.holdModule, name='hold_module'),
    path('module/modify/', Module.modifyModule, name='modify_module'),
    path('module/graph/', Module.moduleGraph, name='garph_module'),
    path('module/show/', Module.showModule, name='show_module'),
]
urlpatterns+=[
    # Departmentrtment URLs
    path('department/', Department.department, name='department'),
    path('department/create/', Department.createDepartment, name='create_department'),
    path('department/show/', Department.showDepartment, name='show_department'),
    path('department/graph/', Department.departmentGraph, name='graph_department'),
    path('department/departmentEmployee',Department.departmentEmployee,name='employee_department')
]
urlpatterns+=[
    # Role urls
    path('role/',Role.role,name='role'),
    path('role/create/',Role.createRole,name='create_role')
]

urlpatterns+=[
    # Permission urls
    path('permisision/',Permission.permission, name= 'permission'),
]
urlpatterns+=[
    # User urls
    path('user/',User.user, name= 'user'),
    path('create_user/',User.create_user, name='create_user'),
]
urlpatterns+=[
    path('log/',UserLog.log,name='log')
]

