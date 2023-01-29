
# Create your tests here.
import json
import pytest
from django.test import Client, TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
from .models import (ExperienceLevel, Instrument, JamRequest, JamResponse,
                     MusicGenre, User, UserGenre, UserInstrument)


@pytest.mark.django_db
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

    @pytest.mark.django_db
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


class UserTests(APITestCase):
    def setUp(self):
        self.valid_payload = {
            'fname': 'John',
            'lname': 'Doe',
            'street': '123 Main St',
            'city': 'Anytown',
            'state': 'CA',
            'zipcode': '12345',
            'phone': '555-555-5555',
            'email': 'johndoe@example.com'
            }
        self.invalid_payload = {
            'fname': '',
            'lname': 'Doe',
            'street': '123 Main St',
            'city': 'Anytown',
            'state': 'CA',
            'zipcode': '12345',
            'phone': '555-555-5555',
            'email': 'johndoe@example.com'
            }

    def test_create_valid_user(self):
        response = self.client.post(reverse('user-list'), data=json.dumps(self.valid_payload), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().fname, 'John')
        self.assertEqual(User.objects.get().lname, 'Doe')
        self.assertEqual(User.objects.get().street, '123 Main St')
        self.assertEqual(User.objects.get().city, 'Anytown')
        self.assertEqual(User.objects.get().state, 'CA')
        self.assertEqual(User.objects.get().zipcode, '12345')
        self.assertEqual(User.objects.get().phone, '555-555-5555')
        self.assertEqual(User.objects.get().email, 'johndoe@example.com')

    def test_create_invalid_user(self):
        response = self.client.post(reverse('user-list'),
                                    data=json.dumps(self.invalid_payload),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_view_all_users(self):
        User.objects.create(**self.valid_payload)
        response = self.client.get(reverse('user-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_update_valid_user(self):
        user = User.objects.create(**self.valid_payload)
        response = self.client.put(reverse('user-detail', kwargs={'pk': user.pk}),
                                   data=json.dumps({'username': 'janedoe'}),
                                   content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(User.objects.get().username, 'janedoe')

    def test_update_invalid_user(self):
        user = User.objects.create(**self.valid_payload)
        response = self.client.put(reverse('user-detail', kwargs={'pk': user.pk}),
                                   data=json.dumps({'username': ''}),
                                   content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_valid_user(self):
        user = User.objects.create(**self.valid_payload)
        response = self.client.delete(reverse('user-detail', kwargs={'pk': user.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class UserInstrumentTests(APITestCase):
    def setUp(self):
        self.valid_payload = {
            'fname': 'John',
            'lname': 'Doe',
            'street': '123 Main St',
            'city': 'Anytown',
            'state': 'CA',
            'zipcode': '12345',
            'phone': '555-555-5555',
            'email': 'johndoe@example.com',
        }
        self.valid_instrument_payload = {
            'name': 'Guitar',
            'type': 'String',
            'brand': 'Fender',
            'model': 'Stratocaster',
            'serial': '1234567890'
        }
        self.user = User.objects.create(**self.valid_payload)
        self.instrument = Instrument.objects.create(**self.valid_instrument_payload)
        self.valid_userinstrument_payload = {
            'user': self.user.id,
            'instrument': self.instrument.id
        }

    def test_create_valid_userinstrument(self):
        user = User.objects.create(**self.valid_payload)
        instrument = Instrument.objects.create(**self.valid_payload)
        self.valid_payload = {
            'user': user.id,
            'instrument': instrument.id
        }
        response = self.client.post(reverse('userinstrument-list'),
                                    data=json.dumps(self.valid_payload),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(UserInstrument.objects.count(), 1)
        self.assertEqual(UserInstrument.objects.get().user, user)
        self.assertEqual(UserInstrument.objects.get().instrument, instrument)

    def test_create_invalid_userinstrument(self):
        User.objects.create(**self.valid_payload)
        response = self.client.post(reverse('userinstrument-list'),
                                    data=json.dumps(self.invalid_payload),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(UserInstrument.objects.count(), 0)


@pytest.mark.django_db
class ExperienceLevelTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.valid_payload = {
            'level': 'Beginner'
        }
        self.invalid_payload = {
            'level': ''
        }

    def test_create_valid_experiencelevel(self):
        response = self.client.post(reverse('experiencelevel-list'),
                                    data=json.dumps(self.valid_payload),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ExperienceLevel.objects.count(), 1)
        self.assertEqual(ExperienceLevel.objects.get().level, 'Beginner')

    def test_create_invalid_experiencelevel(self):
        response = self.client.post(reverse('experiencelevel-list'),
                                    data=json.dumps(self.invalid_payload),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(ExperienceLevel.objects.count(), 0)

    def test_retrieve_valid_experiencelevel(self):
        experiencelevel = ExperienceLevel.objects.create(**self.valid_payload)
        response = self.client.get(reverse('experiencelevel-detail', kwargs={'pk': experiencelevel.pk}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('level'), 'Beginner')

    def test_update_valid_experiencelevel(self):
        experiencelevel = ExperienceLevel.objects.create(**self.valid_payload)
        new_payload = {'level': 'Intermediate'}
        response = self.client.put(reverse('experiencelevel-detail', kwargs={'pk': experiencelevel.pk}),
                                   data=json.dumps(new_payload),
                                   content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(ExperienceLevel.objects.get().level, 'Intermediate')

    def test_delete_valid_experiencelevel(self):
        experiencelevel = ExperienceLevel.objects.create(**self.valid_payload)
        response = self.client.delete(reverse('experiencelevel-detail', kwargs={'pk': experiencelevel.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(ExperienceLevel.objects.count(), 0)

class GetAllJamRequestsTest(APITestCase):

    @staticmethod
    def create_jamrequest(user="", instrument="", genre="", location="", exp_level="", status=""):
        if user != "" and instrument != "" and genre != "" and location != "" and exp_level != "" and status != "":
            JamRequest.objects.create(user=user, instrument=instrument, genre=genre, location=location, exp_level=exp_level, status=status)

    def setUp(self):
        # add test data
        self.create_jamrequest("test user", "test instrument", "test genre", "test location", "test exp level", "test status")
        self.create_jamrequest("test user 2", "test instrument 2", "test genre 2", "test location 2", "test exp level 2", "test status 2")
        self.valid_payload = {
            'user': "valid user",
            'instrument': "valid instrument",
            'genre': "valid genre",
            'location': "valid location",
            'exp_level': "valid exp level",
            'status': "valid status"
        }
        self.invalid_payload = {
            'user': "",
            'instrument': "",
            'genre': "",
            'location': "",
            'exp_level': "",
            'status': ""
        }

    def test_get_all_jamrequests(self):
        # get API response
        response = self.client.get(reverse('jamrequest-list'))
        # get data from db
        jamrequests = JamRequest.objects.all()
        serializer = JamRequestSerializer(jamrequests, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_valid_jamrequest(self):
        response = self.client.post(
            reverse('jamrequest-list'),
            data=self.valid_payload
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_jamrequest(self):
        response = self.client.post(
            reverse('jamrequest-list'),
            data=self.invalid_payload
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_valid_single_jamrequest(self):
        response = self.client.get(
            reverse('jamrequest-detail', kwargs={'pk': 1})
        )
        jamrequest = JamRequest.objects.get(pk
