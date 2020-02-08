from django.utils.deprecation import MiddlewareMixin


class RegisterLoginForm(MiddlewareMixin):

    def process_request(self, request):

        request.form = 'form'
        return None