from django.urls import path
from .views import (
    api_customer,
    api_list_customers,
    api_salespeople,
    api_list_salespeople,
    api_sale,
    api_list_sales
)

urlpatterns = [
    path("salespeople/", api_list_salespeople, name="salespersons"),
    path("salespeople/<int:pk>/", api_salespeople, name="salesperson"),
    path("customers/", api_list_customers, name="customers"),
    path("customers/<int:pk>/", api_customer, name="customer"),
    path("sales/", api_list_sales, name="sales"),
    path("sales/<int:pk>/", api_sale, name="sale"),
]
