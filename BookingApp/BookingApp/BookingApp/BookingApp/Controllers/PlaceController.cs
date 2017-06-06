﻿using BookingApp.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BookingApp.Controllers
{
    [RoutePrefix("place")]
    public class PlaceController : ApiController
    {
        private BAContext db = new BAContext();

        [Authorize(Roles = "Admin, Manager")]
        [HttpPost]
        [Route("AddPlace")]
        public IHttpActionResult AddPlace(Place place)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Places.Add(place);
            db.SaveChanges();
            return Ok();
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete]
        [Route("DeletePlace/{id}")]
        public IHttpActionResult DeletePlace(int id)
        {
            Place place = db.Places.Find(id);

            if (place == null)
            {
                return NotFound();
            }

            db.Places.Remove(place);
            db.SaveChanges();

            return Ok(place);
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPut]
        [Route("ChangePlace/{id}")]
        public IHttpActionResult ChangePlace(int id, Place place)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != place.Id)
            {
                return BadRequest();
            }

            db.Entry(place).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeExist(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }

            }
            return StatusCode(HttpStatusCode.NoContent);
        }

        private bool TypeExist(int id)
        {
            return db.Places.Count(e => e.Id == id) > 0;
        }

        [HttpGet]
        [Route("AllPlaces")]
        public IQueryable<Place> AllPlaces()
        {
            return db.Places;
        }


        [HttpGet]
        [Route("GetPlace/{id}")]
        public IHttpActionResult GetPlace(int id)
        {
            Place place = db.Places.Find(id);
            if (place == null)
            {
                return NotFound();
            }

            return Ok(place);
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

    }
}
