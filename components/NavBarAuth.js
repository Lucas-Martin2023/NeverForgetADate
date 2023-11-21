/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/events">
          <Navbar.Brand>NFAD</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ml-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/events">
              <Nav.Link>View Events</Nav.Link>
            </Link>
            <Link passHref href="/event/new">
              <Nav.Link>Add Event</Nav.Link>
            </Link>
            <Link passHref href="/dates">
              <Nav.Link>View Dates</Nav.Link>
            </Link>
            <Link passHref href="/date/new">
              <Nav.Link>Add Date</Nav.Link>
            </Link>
            <Button type="button" className="btn-danger" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
