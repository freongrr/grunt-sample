package com.github.freongrr.grunt.java;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * TODO : documentation
 */
public final class AppServlet extends HttpServlet {

    @Override
    protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
            throws ServletException, IOException {

        if (request.getRequestURI().equals("/users")) {
            final String users = "[" +
                    "{\"id\": \"1\", \"firstName\": \"Bob\", \"lastName\": \"MacTest\"}," +
                    "{\"id\": \"2\", \"firstName\": \"mary\", \"lastName\": \"Foo\"}," +
                    "{\"id\": \"3\", \"firstName\": \"paul\", \"lastName\": \"Bar\"}" +
                    "]";

            response.setStatus(HttpServletResponse.SC_OK);
            response.setContentType("application/json");
            response.setContentLength(users.length());
            response.getWriter().print(users);
        } else {
            super.doGet(request, response);
        }
    }
}
