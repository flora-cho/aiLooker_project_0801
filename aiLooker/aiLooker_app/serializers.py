from rest_framework      import serializers
from aiLooker_app.models import Tbladvtbsc
from aiLooker_app.models import Tblphnnolist

class TbladvtbscSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'advtno',
            'advttpcd',
        )
        model = Tbladvtbsc

class TblphnnolistSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'phnno',
            'whtlistyn',
        )
        model = Tblphnnolist        