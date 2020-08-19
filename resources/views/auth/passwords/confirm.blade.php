<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>{{ env('APP_NAME') }}</title>
    <!-- Favicon-->
    <link rel="icon" href="favicon.ico" type="image/x-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">

    <!-- Bootstrap Core Css -->
    <link href="../plugins/bootstrap/css/bootstrap.css" rel="stylesheet">

    <!-- Waves Effect Css -->
    <link href="../plugins/node-waves/waves.css" rel="stylesheet" />

    <!-- Animation Css -->
    <link href="../plugins/animate-css/animate.css" rel="stylesheet" />

    <!-- Custom Css -->
    <link href="../css/style.css" rel="stylesheet">
</head>

<body class="login-page">
    <div class="login-box">
        
        <div class="logo">
            <div class="image">
                <img src="../images/logo.png" width="335" alt="Logo" />
            </div>
        </div>
        
        <div class="card">
            <div class="body">
            {{ __('Please confirm your password before continuing.') }}
                @if (session('status'))
                    <div class="alert alert-success" role="alert">
                        {{ session('status') }}
                    </div>
                @endif
                <form id="sign_in" action="{{ route('password.confirm') }}" method="POST">
                    @csrf
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">lock</i>
                        </span>
                        <div class="form-line @error('email') error @enderror">
                            <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" placeholder="Password" name="password" required autocomplete="current-password" autofocus>
                            @error('password')
                                <label id="password-error" class="error" for="password">{{ $message }}</label>
                            @enderror
                        </div>

                    </div>
                    

                    <div class="row">
                        <div class="col-xs-12">
                            <button type="submit" class="btn btn-block bg-orange">
                                {{ __('Confirm Password') }}
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 align-center">
                            @if (Route::has('password.request'))
                                <a class="btn btn-link" href="{{ route('password.request') }}">
                                    {{ __('Forgot Your Password?') }}
                                </a>
                            @endif
                        </div>
                        
                    </div>
                </form>

            </div>
        </div>
        
        {{-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 align-center m-t-90">
            <div class="copyright">
                &copy; Teiker {{ date('Y') }}
                <a href="https://teiker.mx/terminos-y-condiciones/" target="_blank"> Términos &amp; Condiciones </a>
            </div>
        </div> --}}
    </div>


    <!-- Jquery Core Js -->
    <script src="../plugins/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core Js -->
    <script src="../plugins/bootstrap/js/bootstrap.js"></script>

    <!-- Waves Effect Plugin Js -->
    <script src="../plugins/node-waves/waves.js"></script>

    <!-- Validation Plugin Js -->
    <script src="../plugins/jquery-validation/jquery.validate.js"></script>

    <!-- Custom Js -->
    {{-- <script src="../js/admin.js"></script> --}}
    <script src="../js/pages/examples/sign-in.js"></script>
</body>

</html>
