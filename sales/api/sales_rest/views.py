from django.shortcuts import render
from common.json import ModelEncoder
from .models import AutomobileVO, Salesperson, Customer, Sale
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold"
    ]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id"
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id"
    ]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "automobile",
        "salesperson",
        "customer",
        "id"
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonEncoder,
        )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def api_salespeople(request, pk):
    if request.method == "GET":
        try:
            salespersons = Salesperson.objects.get(id=pk)
            return JsonResponse(
                salespersons,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        count, _ =Salesperson.objects.filter(id=pk).delete()
        if count:
            return JsonResponse({"deleted": count > 0})
        else:
            return JsonResponse(
                {"deleted": count > 0},
                status=404
            )


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def api_customer(request, pk):
    if request.method == "GET":
        try:
            customers = Customer.object.get(id=pk)
            return JsonResponse(
                customers,
                encoders=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        count, _ = Customer.objects.filter(id=pk).delete()
        if count:
            return JsonResponse({"deleted": count > 0})
        else:
            return JsonResponse(
                {"deleted": count > 0},
                status=404
            )


@require_http_methods(["GET", "POST"])
def api_list_sales(request, automobile_vo_vin=None):
    if request.method == "GET":
        if automobile_vo_vin is not None:
            sales = Sale.objects.filter(automobile=automobile_vo_vin)
        else:
            sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder = SaleEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            automobiles = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=automobiles)
            content["automobile"] = automobile
            automobile.sold = True
            automobile.save()
            salespersons = content["salesperson"]
            salesperson = Salesperson.objects.get(employee_id=salespersons)
            content["salesperson"] = salesperson
            customers = content["customer"]
            customer = Customer.objects.get(id=customers)
            content["customer"] = customer
        except:
            if AutomobileVO.DoesNotExist:
                return JsonResponse(
                    {"message": "Automobile not found!"},
                    status=400
                )
            elif Salesperson.DoesNotExist:
                return JsonResponse(
                    {"message": "Salesperson not found!"},
                    status=400
                )
            elif Customer.DoesNotExist:
                return JsonResponse(
                    {"message": "Customer not found!"},
                    status=400
                )

        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False
        )


@require_http_methods(["GET", "DELETE"])
def api_sale(request, pk):
    if request.method == "GET":
        sales = Sale.objects.get(id=pk)
        return JsonResponse(
            sales,
            encoder=SaleEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        try:
            sale = Sale.objects.get(id=pk)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Does not exist"},
                status=404
            )
