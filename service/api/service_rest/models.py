from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return f"VIN: {self.vin}"


class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Appointment(models.Model):
    STATUS = (
        ("created", "Created"),
        ("canceled", "Canceled"),
        ("finished", "Finished"),
    )
    customer = models.CharField(max_length=200)
    vin = models.CharField(max_length=17)
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    status = models.CharField(
        max_length=200,
        choices = STATUS,
        default="created"
    )
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.customer

    def get_api_url(self):
        return reverse("api_appointments", kwargs={"pk": self.pk})
