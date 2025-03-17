from django.shortcuts import render

# Create your views here.

class Dashboard:
    def index(request):
        return render(request,"index.html")

# task api views
class Task:
    def task( request):
        return render(request, 'task/tasks.html') 
    def createTask( request):
        return render(request, 'task/modifyTask.html')
    def showTask(request):
        return render(request,'task/showTask.html')
    def modifyTask(request):
        return render(request,'task/modifyTask.html')
    def taskGraph( request):
        return render(request , 'task/task_graph.html')
    
    

class Project:
    def project(request):
        return render(request,'project/project.html')
    def createProject(request):
        return render(request,'project/createProject.html')
    def modifyProject(request):
        return render(request,'project/modifyProject.html')
    def holdProject(request):
        return render(request,'project/holdProject.html')
    def showProject(request):
        return render(request,'project/showProject.html')
    def deleteProject(request):
        return render(request,'project/deleteProject.html')
    

        



class Department:
    def department( request):
        return render(request , 'department/department.html')
    def createDepartment( request):
        return render(request, 'department/createDepartment.html')
    def departmentEmployee( request):
        return  render(request, 'department/department_employee.html')
    def departmentGraph( request):
        return render(request , 'department/department_graph.html')
    def showDepartment(request):
        return render(request,'department/showDepartment.html')
        

# module api views

class Module:
    def module( request):
        return render(request, 'module/module.html') 
    def createModule( request):
        return render(request, 'module/createModule.html')
    def holdModule(request):
        return render(request,'module/holdModule.html')
    def modifyModule(request):
        return render(request,'module/modifyModule.html')
    def moduleGraph( request):
        return render(request , 'module/module_graph.html')
    def showModule( request):
        return render(request , 'module/showModule.html')
        
    
    
    
class Role:
    def role( request):
        return render(request , 'role/role.html')
    def createRole( request):
        return render(request , 'role/createRole.html')




class Permission:
    def permission( request):
        return render(request , 'permission/permission.html')
    
class User:
    def user(request):
        return render(request,'user/user.html')
    def create_user(request):
        return render(request,'user/create_user.html')
class UserLog:
    def log(request):
        return render(request,'log/log.html')


