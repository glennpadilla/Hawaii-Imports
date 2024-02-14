from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO,
    properties = [
        "vin",
        "sold",
    ]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "vin",
        "customer",
        "date_time",
        "technician",
        "reason",
        "status",
        "id"
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_del_technician(request, pk):
    if request.method == "DELETE":
        count, _ = Technician.objects.filter(id=pk).delete()
        if count:
            return JsonResponse({"deleted: count > 0"})
        else:
            return JsonResponse(
                {"deleted": count > 0},
                status=400
            )


@require_http_methods(["GET", "POST"])
def api_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        try:
            tech_id = content["technician"]
            technician = Technician.objects.get(employee_id=tech_id)
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Technician employee ID"},
            )
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_appointment_delete(request, pk):
    if request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=pk).delete()
        if count:
            return JsonResponse({"deleted": count > 0})
        else:
            return JsonResponse(
                {"deleted": count > 0},
                status=400
            )


@require_http_methods(["PUT"])
def api_appointment_cancel(request, pk):
    if request.method == "PUT":
        appointment = Appointment.objects.get(id=pk)
        appointment.status = "canceled"
        appointment.save()
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
    )
    else:
        return JsonResponse(
            {"error": "Could not change value to canceled"},
            status=400
        )


@require_http_methods(["PUT"])
def api_appointment_finish(request, pk):
    if request.method == "PUT":
        appointment = Appointment.objects.get(id=pk)
        appointment.status = "finished"
        appointment.save()
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
    )
    else:
        return JsonResponse(
            {"error": "Could not change value to finished"},
            status=400
        )
