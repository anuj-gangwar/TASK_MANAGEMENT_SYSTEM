from django.urls import path
from .views import *





urlpatterns = [
    path('',  index, name='index'),

    # Task URLs
    path('task/', task_view, name='task'),
    path('task/create/', create_task, name='create_task'),
    # path('task/show/', Task.showTask, name='show_task'),
    # path('task/modify/', Task.modifyTask, name='modify_task'),
    # path('task/graph/', Task.taskGraph, name='garph_task')
]
urlpatterns+=[
    # Project urls
    path('project/', ProjectView.project, name='project'),
    path('project/create/',ProjectView.create_project , name='create_roject'),
    path('project/modify/',ProjectView.modifyProject, name='modify_project'),
    path('project/hold/', ProjectView.holdProject, name='hold_project'),
    path('project/show/', ProjectView.showProject, name='show_project'),
    path('project/delete/', ProjectView.deleteProject, name='delete_project'),
]
urlpatterns+=[
    # Module URLs
    path('module/', ModuleView.module, name='module'),
    path('module/create/', ModuleView.createModule, name='create_module'),
    path('module/hold/', ModuleView.holdModule, name='hold_module'),
    path('module/modify/', ModuleView.modifyModule, name='modify_module'),
    path('module/graph/', ModuleView.moduleGraph, name='garph_module'),
    path('module/show/', ModuleView.showModule, name='show_module'),
]
urlpatterns+=[
    # Departmentrtment URLs
    path('department/', DepartmentView.department, name='department'),
    path('department/create/', DepartmentView.createDepartment, name='create_department'),
    path('department/<int:department_id>/show/', DepartmentView.showDepartment, name='show_department'),
    path('department/departmentEmployee',DepartmentView.departmentEmployee,name='employee_department'),
    path('department/modifyDepartment',DepartmentView.modifydepartment,name='modify_department')
]
urlpatterns+=[
    # Role urls
    path('role/',RoleView.role,name='role'),
    path('role/create/',RoleView.createRole,name='create_Role'),
    path('role/view/',RoleView.viewRole,name='view_role'),
    path('role/modify/',RoleView.modifyRole,name='modify_role')
]

urlpatterns+=[
    # Permission urls
    path('permisision/',PermissionView.permission, name= 'permission'),
]
urlpatterns+=[
    # User urls
    path('user/',UserView.user, name= 'user'),
    path('user/createuser/',UserView.createUser, name='create_user'),
    path('user/modifyUser',UserView.usermodify,name='modify_user'),
    path('users/<int:user_id>/detail/', UserView.userdetail, name='user_detail'),
]
urlpatterns+=[
    path('log/',UserLogView.log,name='log')
]
# urlpatterns+=[
#     path('login/',Authentication.adminlogin,name='login'),
#     path('logout/',Authentication.adminlogout,name='logout'),
#     path('signup/',Authentication.adminSignup,name='signup') 
# ]

