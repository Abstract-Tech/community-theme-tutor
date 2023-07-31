from django.conf import settings
from django.core.mail.message import EmailMessage
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

import json
import logging


logger = logging.getLogger(__file__)


@csrf_exempt
@require_http_methods(["POST"])
def send_contact_form_email(request):
    try:
        payload = request.POST.dict()
        email = EmailMessage()
        email.subject = f"Request for contact from {settings.LMS_BASE}"
        email.from_email = settings.DEFAULT_FROM_EMAIL
        email.to = ["helpdesk@abstract-technology.de"]
        if not payload.get("email"):
            return JsonResponse({"error": "The email field is required"})
        if not payload.get("Organization"):
            return JsonResponse({"error": "The organization field is required"})
        if not payload.get("sector"):
            return JsonResponse({"error": "The sector field is required"})
        message = f"""
            A contact request was received on {settings.LMS_BASE}:

            * First Name: {payload.get('firstName')}
            * Last Name: {payload.get('lastName')}
            * Work Email: {payload.get('email')}
            * Organization: {payload.get('Organization')}
            * Sector: {payload.get('sector')}
            * Message: {payload.get('msg')}
        """
        email.body = message
        email.send()
        return JsonResponse({"status": "success"})
    except Exception as e:
        logger.error(e)
        return JsonResponse({"status": "fail"})
