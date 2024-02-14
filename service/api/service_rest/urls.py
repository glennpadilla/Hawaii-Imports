from django.urls import path
from .views import (
    api_technicians,
    api_del_technician,
    api_appointments,
    api_appointment_delete,
    api_appointment_cancel,
    api_appointment_finish
)


urlpatterns = [
    path("technicians/", api_technicians, name="api_technicians"),
    path("technicians/<int:pk>/", api_del_technician, name="api_del_technician"),
    path("appointments/", api_appointments, name="api_appointments"),
    path("appointments/<int:pk>/", api_appointment_delete, name="api_appointment_delete"),
    path("appointments/<int:pk>/cancel/", api_appointment_cancel, name="api_appointment_cancel"),
    path("appointments/<int:pk>/finish/", api_appointment_finish, name="api_appointment_finish"),
]
