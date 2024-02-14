from django.contrib import admin
from .models import AutomobileVO, Salesperson, Customer, Sale


@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    # list_display = ["vin", "sold"]
    pass

@admin.register(Salesperson)
class SalespersonAdmin(admin.ModelAdmin):
    # list_display = ["first_name", "last_name", "employee_id"]
    pass

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    # list_display = ["first_name", "last_name", "address", "phone_number"]
    pass

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    # list_display = ["price", "automobile", "salesperson", "customer"]
    pass

