---
layout:     post
title:      "Ruby异常类的结构和常见网络异常"
date:       2015-12-24 08:57:32 UTC
author:     "baicai"
catalog: true
tags:
    - 存档
---

文章介绍了ruby中的异常类的结构，介绍了常见的网络异常，常见的网络错误码

异常类的结构：
<pre class="lang:ruby decode:true ">Object
Exception
	(Interrupt) (ruby 1.7 特性 version 1.6以前的位置)
	NoMemoryError
	scrīptError
		LoadError
		(NameError) (ruby 1.7 特性 version 1.6以前的位置)
		NotImplementedError
		SyntaxError
	SignalException
		Interrupt (ruby 1.7 特性)
	StandardError
		ArgumentError
		IndexError
			KeyError (ruby 1.9 特性)
		IOError
			EOFError
		LocalJumpError
		NameError (ruby 1.7 特性)
			NoMethodError (ruby 1.7 特性)
		RangeError
			FloatDomainError
		RegexpError
		RuntimeError
		SecurityError
		SystemCallError
			Errno::EXXX
		SystemStackError
		ThreadError
		TypeError
		ZeroDivisionError
	SystemExit
	fatal</pre>
net/http中的error类：
<pre class="lang:ruby decode:true ">#http.rb 里的
class HTTPBadResponse &lt; StandardError; end
class HTTPHeaderSyntaxError &lt; StandardError; end

#protocol.rb 里的
class ProtocolError          &lt; StandardError; end
class ProtoSyntaxError       &lt; ProtocolError; end
class ProtoFatalError        &lt; ProtocolError; end
class ProtoUnknownError      &lt; ProtocolError; end
class ProtoServerError       &lt; ProtocolError; end
class ProtoAuthError         &lt; ProtocolError; end
class ProtoCommandError      &lt; ProtocolError; end
class ProtoRetriableError    &lt; ProtocolError; end
ProtocRetryError = ProtoRetriableError</pre>
http错误码：
<pre class="lang:ruby decode:true  ">HTTPResponse
    HTTPUnknownResponse
    HTTPInformation                    # 1xx
        HTTPContinue                       # 100
        HTTPSwitchProtocol                 # 101
    HTTPSuccess                        # 2xx
        HTTPOK                             # 200
        HTTPCreated                        # 201
        HTTPAccepted                       # 202
        HTTPNonAuthoritativeInformation    # 203
        HTTPNoContent                      # 204
        HTTPResetContent                   # 205
        HTTPPartialContent                 # 206
    HTTPRedirection                    # 3xx
        HTTPMultipleChoice                 # 300
        HTTPMovedPermanently               # 301
        HTTPFound                          # 302
        HTTPSeeOther                       # 303
        HTTPNotModified                    # 304
        HTTPUseProxy                       # 305
        HTTPTemporaryRedirect              # 307
    HTTPClientError                    # 4xx
        HTTPBadRequest                     # 400
        HTTPUnauthorized                   # 401
        HTTPPaymentRequired                # 402
        HTTPForbidden                      # 403
        HTTPNotFound                       # 404
        HTTPMethodNotAllowed               # 405
        HTTPNotAcceptable                  # 406
        HTTPProxyAuthenticationRequired    # 407
        HTTPRequestTimeOut                 # 408
        HTTPConflict                       # 409
        HTTPGone                           # 410
        HTTPLengthRequired                 # 411
        HTTPPreconditionFailed             # 412
        HTTPRequestEntityTooLarge          # 413
        HTTPRequestURITooLong              # 414
        HTTPUnsupportedMediaType           # 415
        HTTPRequestedRangeNotSatisfiable   # 416
        HTTPExpectationFailed              # 417
    HTTPServerError                    # 5xx
        HTTPInternalServerError            # 500
        HTTPNotImplemented                 # 501
        HTTPBadGateway                     # 502
        HTTPServiceUnavailable             # 503
        HTTPGatewayTimeOut                 # 504
        HTTPVersionNotSupported            # 505</pre>