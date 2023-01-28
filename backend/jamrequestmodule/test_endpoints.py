
# Create your tests here.
import json
from django.test import TestCase, Client

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Instrument


class InstrumentTests(APITestCase):
    def setUp(self):
        self.valid_payload = {
            'name': 'Guitar',
            'type': 'String'
        }
        self.invalid_payload = {
            'name': '',
            'type': 'String'
        }

    def test_create_valid_instrument(self):
        response = self.client.post(reverse('instrument-list'),
                                    data=json.dumps(self.valid_payload),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Instrument.objects.count(), 1)
        self.assertEqual(Instrument.objects.get().name, 'Guitar')

    def test_create_invalid_instrument(self):
        response = self.client.post(reverse('instrument-list'),
                                    data=json.dumps(self.invalid_payload),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_view_all_instruments(self):
        Instrument.objects.create(**self.valid_payload)
        response = self.client.get(reverse('instrument-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_update_valid_instrument(self):
        instrument = Instrument.objects.create(**self.valid_payload)
        response = self.client.put(reverse('instrument-detail', kwargs={'pk': instrument.pk}),
                                   data=json.dumps({'name': 'Bass'}),
                                   content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Instrument.objects.get().name, 'Bass')

    def test_update_invalid_instrument(self):
        instrument = Instrument.objects.create(**self.valid_payload)
        response = self.client.put(reverse('instrument-detail', kwargs={'pk': instrument.pk}),
                                   data=json.dumps({'name': ''}),
                                   content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_valid_instrument(self):
        instrument = Instrument.objects.create(**self.valid_payload)
        response = self.client.delete(reverse('instrument-detail', kwargs={'pk': instrument.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
