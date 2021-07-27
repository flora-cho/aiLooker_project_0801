from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Tblphnnolist
from .serializers import TblphnnolistSerializer
from aiLooker_app import serializers


def index(request):
    context = {}
    return render(request, "index.html", context=context)


def login_view(request):
    context = {}
    return render(request, "login.html", context=context)


@api_view(['GET'])
def receiveTblphnnolist(request, phnno):
    totalphnnolists = Tblphnnolist.objects.all()
    seializer       = TblphnnolistSerializer(totalphnnolists, many=True)
    return Response(seializer.data)
