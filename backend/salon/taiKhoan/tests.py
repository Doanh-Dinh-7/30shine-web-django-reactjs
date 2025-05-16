from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status

# Create your tests here.

class TaiKhoanTests(APITestCase):
    def test_register(self):
        url = reverse('dang-ky')
        data = {'username': 'testuser', 'email': 'test@example.com', 'password': '123456'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_login(self):
        self.client.post(reverse('dang-ky'), {'username': 'testuser', 'email': 'test@example.com', 'password': '123456'})
        url = reverse('dang-nhap')
        data = {'username': 'testuser', 'password': '123456'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)