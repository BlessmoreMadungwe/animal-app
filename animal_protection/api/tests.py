from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import AccessToken

from .models import Animal, ContactMessage


class DashboardApiTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="tester",
            email="tester@example.com",
            password="StrongPass123!",
        )
        Animal.objects.create(name="Lion", description="Big cat")
        ContactMessage.objects.create(
            name="Taylor",
            email="taylor@example.com",
            message="Please share more details.",
        )

    def test_dashboard_requires_authentication(self):
        response = self.client.get("/api/dashboard/")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_dashboard_returns_expected_payload_for_authenticated_user(self):
        token = str(AccessToken.for_user(self.user))
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

        response = self.client.get("/api/dashboard/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data,
            {
                "username": "tester",
                "tasks": 1,
                "messages": 1,
                "notifications": 0,
            },
        )


class ContactApiTests(APITestCase):
    def test_contact_submission_creates_message(self):
        payload = {
            "name": "Jordan",
            "email": "jordan@example.com",
            "message": "I want to help.",
        }

        response = self.client.post("/api/contact/", payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["success"], "Message sent successfully!")
        self.assertTrue(
            ContactMessage.objects.filter(email="jordan@example.com").exists()
        )
