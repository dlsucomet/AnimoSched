from django.shortcuts import render

def index(request):
    """View function for home page"""

    test_variable = 'ArcherOne'

    context = {
        'test_variable': test_variable,
    }

    # Render template index.html with the data in the context variable
    return render(request, 'index.html', context=context)