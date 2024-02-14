from django.contrib import admin
from .models import AutomobileVO, Technician, Appointment


@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    pass

@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    pass

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    pass
